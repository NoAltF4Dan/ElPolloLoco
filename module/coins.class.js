/**
 * Represents a coin object that extends DrawableObject.
 */
 class Coins extends DrawableObject {
    /**
     * The height of the coin.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 100;

    /**
     * The offset values for positioning the coin.
     * @type {object}
     * @property {number} top - top offset.
     * @property {number} left - left offset.
     * @property {number} right - right offset.
     * @property {number} bottom - bottom offset.
     */
    offset = {
        top: 15,
        left: 40,
        right: 0,
        bottom: 15
    };

    /**
     * Constructs a new Coins object.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 0 + Math.random() * 400;   
    };
}
