/**
 * Represents a coin bar object that extends DrawableObject.
 */
 class Coinbar extends DrawableObject {
    /**
     * The percentage of the coin bar.
     * @type {number}
     */
    percentage = 0;

    /**
     * Array containing paths to images representing different percentage levels of the coin bar.
     * @type {string[]}
     */
    COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png', 
    ];

    /**
     * Constructs a new Coinbar object.
     */
    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the coin bar.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.COIN_IMAGES[this.coinImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the index of the coin image based on the percentage.
     * @returns {number} - The index of the coin image.
     */
    coinImageIndex() {
        if (this.percentage >= 0 && this.percentage <= 5) {
            return this.percentage;
        } else {
            return 0;
        }
    }
}
