/**
 * Represents an end boss health bar object that extends DrawableObject.
 */
 class EndbossBar extends DrawableObject {
    /**
     * The percentage of the end boss's health.
     * @type {number}
     */
    percentage = 100;

    /**
     * Array containing paths to images representing the end boss's health bar.
     * @type {string[]}
     */
    ENDBOSSBAR_IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png', 
        'img/7_statusbars/2_statusbar_endboss/green/green20.png', 
        'img/7_statusbars/2_statusbar_endboss/green/green40.png', 
        'img/7_statusbars/2_statusbar_endboss/green/green60.png', 
        'img/7_statusbars/2_statusbar_endboss/green/green80.png', 
        'img/7_statusbars/2_statusbar_endboss/green/green100.png', 
    ];

    /**
     * Constructs a new EndbossBar object.
     */
    constructor() {
        super();
        this.loadImages(this.ENDBOSSBAR_IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the end boss's health.
     * @param {number} percentage - The percentage value (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSSBAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the percentage of the end boss's health.
     * @returns {number} The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
