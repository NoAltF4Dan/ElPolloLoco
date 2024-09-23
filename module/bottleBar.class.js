/**
 * Represents a bottle bar object that extends DrawableObject.
 */
 class Bottlebar extends DrawableObject {
    /**
     * The percentage of the bottle bar.
     * @type {number}
     */
    percentage = 0;

    /**
     * Array containing paths to images representing different percentage levels of the bottle bar.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Constructs a new Bottlebar object.
     */
    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the bottle bar.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BOTTLE_IMAGES[this.bottleImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the bottle image based on the percentage.
     * @returns {number} The index of the bottle image.
     */
    bottleImageIndex() {
        if (this.percentage >= 0 && this.percentage <= 5) {
            return this.percentage;
        } else {
            return 0;
        }
    }
}
