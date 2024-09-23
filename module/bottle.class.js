/**
 * Represents a bottle object that extends MoveableObject.
 */
 class Bottle extends MoveableObject {
    /**
     * The height of the bottle object.
     * @type {number}
     */
    height = 70;

    /**
     * The width of the bottle object.
     * @type {number}
     */
    width = 60;

    /**
     * The y-coordinate of the bottle object.
     * @type {number}
     */
    y = 350;

    /**
     * Array containing paths to images representing the bottle on the ground.
     * @type {string[]}
     */
    BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Offset values for the bottle object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Constructs a new Bottle object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        /**
         * The x-coordinate of the bottle object.
         * Randomly generated within a range.
         * @type {number}
         */
        this.x = 200 + Math.random() * 1500;

        this.loadImages(this.BOTTLE_GROUND);
        this.animate();
    };

    /**
     * Animates the bottle object by playing its animation.
     */
    animate() {
        this.bottleMoveInterval = setInterval(() => {
            this.playAnimation(this.BOTTLE_GROUND)
        }, 500);
    }
}
