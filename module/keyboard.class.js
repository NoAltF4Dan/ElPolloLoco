/**
 * Represents a keyboard object for handling input events.
 */
 class Keyboard {
    /**
     * Represents whether the left arrow key is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Represents whether the right arrow key is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Represents whether the up arrow key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Represents whether the down arrow key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Represents whether the space key is pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Represents whether the D key is pressed.
     * @type {boolean}
     */
    D = false;

    /**
     * Constructs a new Keyboard object.
     */
    constructor() {
        this.bindBtsPressEvents();
    }

    /**
     * Binds touch events to on-screen buttons for mobile devices.
     * Used for left, right, jump, and throw buttons.
     */
    bindBtsPressEvents() {
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('throwBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}
