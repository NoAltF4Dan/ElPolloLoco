/**
 * Represents a background object that extends MoveableObject.
 */
 class BackgroundObject extends MoveableObject {

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Constructs a new BackgroundObject.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        /**
         * The x-coordinate of the background object.
         * @type {number}
         */
        this.x = x;
        
        /**
         * The y-coordinate of the background object.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}
