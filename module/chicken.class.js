/**
 * Represents a chicken object that extends MoveableObject.
 */
 class Chicken extends MoveableObject {

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 70;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 70;

    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 350;

    /**
     * Array containing paths to images representing the chicken walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array containing paths to images representing the dead chicken animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Constructs a new Chicken object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 350 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Starts chicken animations.
     */
    animate() {
        this.chickenAnimationInterval = setInterval(() => {
            this.chickenAnimation();
        }, 100);
    }

    /**
     * Animates the chicken based on its state.
     */
    chickenAnimation() {
        if (!this.isDead()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.y = 375;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Animates the chicken walking.
     */
    chickenWalkAnimation() {
        this.chickenWalkInterval = setInterval(() => {
            this.moveLeft();
        }, 20);
    }

    
}
