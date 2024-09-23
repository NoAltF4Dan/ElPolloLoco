/**
 * Represents the game world.
 */
class World {

    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    bottle = 0;
    coin = 0;
    statusBar = new StatusBar();
    endbossBar = new EndbossBar();
    coinBar = new Coinbar();
    bottleBar = new Bottlebar();
    endscreen = new Endscreen();
    winscreen = new Winscreen();
    throwableObject = [];
    bottleInTheAir = false;
    lastThrowTime = 0;
    imageLeft = false;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard controller.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.setWorld();
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.character.gameSound.play();
        this.moveableObject = new MoveableObject();
        this.draw();
        this.enemiesStartWalking();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checkThrowObjects();
        }, 90);
    }

    enemiesStartWalking() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.chickenWalkAnimation();
            }
            if (enemy instanceof ChickenSmall) {
                enemy.chickenSmallWalkAnimation();
            }
        });
    }


    /**
     * Checks collisions of all game objects.
     */
    checkCollisions() {
        this.checkCoinContact();
        this.checkBottleContact();
        this.checkCollisionwithChicken();
        this.checkCollisionBottleEndboss();
        this.checkCollisionsBottleEnemies();
    }

    /**
     * Checks objects thrown by the character.
     */
    checkThrowObjects() {
        if (!this.character.isDead() && this.keyboard.D && this.bottle > 0) {
            const currentTime = new Date().getTime();
            if (!this.bottleInTheAir && currentTime - this.lastThrowTime >= 500) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.character.otherDirection);
                this.throwableObject.push(bottle);
                this.bottle--;
                this.bottleBar.setPercentage(this.bottle);
                this.coinBar.setPercentage(this.coin);
                this.lastThrowTime = currentTime;
            }
        }        
    }


    /**
     * Checks collision with enemy characters.
     */
    checkCollisionwithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (!(enemy instanceof Endboss) && this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveGround() && !this.character.isHurt()) {
                    enemy.kill();
                    enemy.stopMoving();
                    this.removeFromMap(enemy);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            } else if (enemy instanceof Endboss && this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isHurt()) {
                this.character.endbossHitsCharacter();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
 * Checks collision between the character and coins.
 */
    checkCoinContact() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin += 1;
                this.coinBar.setPercentage(this.coin);
                this.coinDisappear(coin);
            }
        });
    }

    /**
     * Removes the collected coin from the level.
     * @param {Object} coin - The coin object to be removed.
     */
    coinDisappear(coin) {
        const index = this.level.coins.indexOf(coin);
        if (index !== -1) {
            this.level.coins.splice(index, 1);
        }
    }

    /**
     * Checks collision between the character and bottles.
     */
    checkBottleContact() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottle += 1;
                this.bottleBar.setPercentage(this.bottle);
                this.bottleDisappear(bottle);
            }
        });
    }

    /**
     * Checks collision between thrown bottles and the end boss.
     */
     checkCollisionBottleEndboss() {
        setInterval(() => {
            this.throwableObject.forEach((throwableObject) => {
                this.level.enemies.forEach((enemy) => {
                    if (enemy instanceof Endboss && throwableObject.isColliding(enemy)) {
                        throwableObject.bottleSplash();
                        this.bottleInTheAir = false;
                        if (!enemy.isHurt()) {
                            enemy.endbossHit();
                            this.endbossBar.setPercentage(enemy.endBossEnergy);
                        }
                    }
                });
            });
        }, 200);
    }
    

    /**
     * Checks collision between thrown bottles and other enemies.
     */
    checkCollisionsBottleEnemies() {
        setInterval(() => {
            this.throwableObject.forEach((throwableObject) => {
                this.level.enemies.forEach((enemy) => {
                    if (throwableObject.isColliding(enemy)) {
                        throwableObject.bottleSplash();
                        this.bottleInTheAir = false;
                        if (!enemy.isHurt()) {
                            enemy.kill();
                            enemy.stopMoving();
                            this.removeFromMap(enemy);
                        }
                    }
                });
            });
        }, 200);
    }


    /**
 * Removes an enemy from the map after a delay.
 * @param {Object} enemy - The enemy object to be removed.
 */
    removeFromMap(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    /**
     * Removes a bottle from the map.
     * @param {Object} bottle - The bottle object to be removed.
     */
    bottleDisappear(bottle) {
        const index = this.level.bottle.indexOf(bottle);
        if (index !== -1) {
            this.level.bottle.splice(index, 1);
        }
    }

    /**
     * Displays the restart button on the end screen.
     */
    showRestartButton() {
        document.getElementById('endscreen').style.display = 'flex';
    }

    /**
     * Draws all game elements on the canvas.
     */
     draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addMainObjectsToMap();
    
        if (this.character.isDead()) {
            this.characterisDead();
            return; 
        }
    
        let endbossDead = true;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && !enemy.endbossIsDead()) {
                endbossDead = false;
            }
        });
    
        if (endbossDead) {
            this.deathOfEndboss();
            return;  
        }
    
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
            self.draw();
        });
    }
    
    /**
     * Stoppt die Animation, wenn der Endboss tot ist.
     */
    stopAnimation() {
        cancelAnimationFrame(this.animationFrameId);
    }
    

    /**
 * Adds main objects to the map, including background objects, clouds, character, and bars.
 */
    addMainObjectsToMap() {
        this.addObjectstoMap(this.level.backgroundObjects);
        this.addObjectstoMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addBarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addMoreObjectsToMap();
    }

    /**
     * Adds bars to the map, including status bar, coin bar, bottle bar, and endboss bar.
     */
    addBarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
    }

    /**
     * Adds more objects to the map, including enemies, throwable objects, coins, and bottles.
     */
    addMoreObjectsToMap() {
        this.addObjectstoMap(this.level.enemies);
        this.addObjectstoMap(this.throwableObject);
        this.addObjectstoMap(this.level.coins);
        this.addObjectstoMap(this.level.bottle);
    }

    /**
     * Handles actions when the character is dead.
     */
    characterisDead() {
        this.whenCharacterisDead();
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.endscreen);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Handles actions when the end boss is dead.
     */
    deathOfEndboss() {
        this.whenEndbossisDead();
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.winscreen);
        this.ctx.translate(this.camera_x, 0);
    }

    restartGame() {
        this.character.clearLevelIntervalls();
        this.character.clearCharacterIntervalls();
        window.location.reload(true);
    }

    /**
     * Handles actions when the character is dead.
     */
    whenCharacterisDead() {
        this.showRestartButton();
        this.character.clearLevelIntervalls();
        this.character.clearCharacterIntervalls();
        this.character.music.play();
        this.character.gameSound.pause();
    }
    /**
     * Handles actions when the end boss is dead.
     */
    whenEndbossisDead() {
        this.showRestartButton();
        this.character.clearLevelIntervalls();
        this.character.clearCharacterIntervalls();
        this.character.music.play();
        this.character.gameSound.pause();
    }

    /**
     * Adds objects to the map.
     * @param {Object[]} objects - Array of objects to be added to the map.
     */
    addObjectstoMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    };


    /**
 * Adds the specified object to the map.
 * @param {Object} mo - The object to be added to the map.
 */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally if the character is not dead.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        if (!this.character.isDead()) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
    }

    /**
     * Reverts the image back to its original state if the character is not dead.
     * @param {Object} mo - The object whose image is to be reverted.
     */
    flipImageBack(mo) {
        if (!this.character.isDead()) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

}