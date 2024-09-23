/**
 * Represents a throwable object that extends MoveableObject.
 */
class ThrowableObject extends MoveableObject {


    /**
     * The array of image paths for the throwable object's throw animation.
     * @type {string[]}
     */
    THROW_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * The array of image paths for the throwable object's splash animation.
     * @type {string[]}
     */
    SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    /**
     * Constructs a new ThrowableObject object.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     */
    constructor(x, y, character) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.character = character;
        this.loadImages(this.THROW_IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.throw();
        this.throwAnimation();
        this.otherDirection;
    }

   /**
 * Throws the bottle object.
 */
    throw() {
        if (!this.bottleInTheAir && !this.hasThrownBottle) {
            this.hasThrownBottle = true;
            this.speedY = 15;
            this.applyGravity();
            if (this.character && !this.character.otherDirection) {
                setInterval(() => {
                    this.x -= 10; 
                }, 50);
            } else {
                setInterval(() => {
                    this.x += 10; 
                }, 60);
            }
        }
    }
    
    
    /**
     * Checks if the bottle is thrown.
     * @returns {boolean} - True if the bottle is thrown, false otherwise.
     */
    bottleIsThrown() {
        return this.y >= 380;
    }

    /**
 * Initiates the animation sequence for the throwable object when thrown.
 * This function continuously checks if the bottle is in the air or if it has been thrown.
 * If the bottle is thrown, it triggers the splash animation; otherwise, it triggers the throw animation.
 */
throwAnimation() {
    setInterval(() => {
        if (!this.bottleInTheAir || this.bottleIsThrown()) {
            if (this.bottleIsThrown()) {
                this.bottleSplash();
            } 
            else {
                this.playAnimation(this.THROW_IMAGES);
            }
        }
    }, 100); 
}

    /**
     * Plays the splash animation of the bottle object.
     */
     bottleSplash() {
        this.playAnimation(this.SPLASH_IMAGES);
        this.speedY = -25;
    }
    

}
