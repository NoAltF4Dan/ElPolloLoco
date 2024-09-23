/**
 * Represents a level object.
 */
 class Level {
    level_end_x = 2500;
    /**
     * Array containing enemy objects.
     * @type {Array}
     */
    enemies;

    /**
     * Array containing cloud objects.
     * @type {Array}
     */
    clouds;

    /**
     * Array containing background object objects.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * Array containing coin objects.
     * @type {Array}
     */
    coins;

    /**
     * Object representing the bottle.
     * @type {Object}
     */
    bottle;
    
    endboss = new Endboss();


    /**
     * Constructs a new Level object.
     * @param {Array} enemies - Array containing enemy objects.
     * @param {Array} clouds - Array containing cloud objects.
     * @param {Array} backgroundObjects - Array containing background object objects.
     * @param {Array} coins - Array containing coin objects.
     * @param {Object} bottle - Object representing the bottle.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}
