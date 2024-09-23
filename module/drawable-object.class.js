/**
 * Represents a drawable object.
 */
 class DrawableObject {
    /**
     * The x-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the drawable object.
     * @type {number}
     */
    y = 330;

    /**
     * The image object of the drawable object.
     * @type {object}
     */
    img;

    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 100;

    /**
     * Cache for loaded images.
     * @type {object}
     */
    imageCache = {};

    /**
     * Cache for loaded chicken images.
     * @type {object}
     */
    imageCacheChicken = {};

    /**
     * Index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Array of images.
     * @type {array}
     */
    images;

    /**
     * Loads an image.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path; 
    }

    /**
     * Loads multiple images.
     * @param {array} arr - Array containing paths to images.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image(); 
            img.src = path; 
            this.imageCache[path] = img; 
        });
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {object} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
