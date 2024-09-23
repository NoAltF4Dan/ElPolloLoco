/**
 * Represents a moveable object that extends DrawableObject.
 */
 class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    endBossEnergy = 100;
    lastHit = 0;
    animationCounter = 0;
    character;
    otherDirection;
    hasBeenHit = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the moveable object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.animationCounter = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the moveable object is above the ground.
     * @returns {boolean} - True if above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the moveable object is colliding with another moveable object.
     * @param {Object} mo - The other moveable object to check collision with.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
    const xOffset = -50; 
    return this.x + this.width - this.offset.right + xOffset > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
}

    /**
     * Records a hit on the moveable object.
     */
     hit() {
        if (!this.isDead()) {  
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime(); 
            }
        }
    }
    

    endbossHitsCharacter() {
        this.energy -= 30;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the moveable object is hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500;
        return timepassed < 1;
    }

    /**
     * Records a hit on the moveable object by an end boss.
     */
     endbossHit() {
        if (!this.endbossIsDead()) {
            this.endBossEnergy -= 20;
            if (this.endBossEnergy < 0) {
                this.endBossEnergy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }
    

    /**
     * Checks if the moveable object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Kills the moveable object.
     */
    kill() {
        this.energy = 0;
    }

    /**
     * Checks if the moveable object of an end boss is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    endbossIsDead() {
        return this.endBossEnergy === 0;
    }

    /**
     * Plays animation for the moveable object.
     * @param {Array} images - The array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays animation for the moveable object with an end condition.
     * @param {Array} images - The array of image paths for animation.
     */
    playAnimationWithEnd(images) {
        if (this.animationCounter <= images.length) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.animationCounter++;
        }
    }

    /**
     * Moves the moveable object to the right.
     */
    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
        }
    }

    /**
     * Moves the moveable object to the left.
     */
    moveLeft() {
        if (!this.isDead()) {
            this.x -= this.speed;
        }
    }

    /**
     * Stops the moveable object from moving.
     */
    stopMoving() {
        this.x == 0;
    }

    /**
     * Makes the moveable object jump.
     */
    jump() {
        if (!this.isDead() && !this.isAboveGround()) {
            this.speedY = 20;
        }
    }

    /**
     * Clears intervals related to the level.
     */
    clearLevelIntervalls() {
        world.level.enemies.forEach((Chicken) => {
            Chicken.speed = 0;
            clearInterval(Chicken.chickenAnimationInterval);
            clearInterval(Chicken.chickenWalkInterval);
            clearInterval(Chicken.chickenSmallAnimationInterval);
            clearInterval(Chicken.chickenSmallWalkInterval);
        });
        world.level.enemies.forEach((endboss) => {
            endboss.speed = 0;
            clearInterval(endboss.endbossImagesInterval);
            clearInterval(endboss.endbossAttackInterval);
        });
        world.level.bottle.forEach((bottle) => {
            clearInterval(bottle.bottleMoveInterval);
        });
        world.level.clouds.forEach((cloud) => {
            clearInterval(cloud.cloudInterval);
        })
    }

    /**
     * Clears intervals related to the character.
     */
    clearCharacterIntervalls() {
        clearInterval(world.character.characterImagesInterval);
        clearInterval(world.character.endbossAttackInterval);
    }
}
