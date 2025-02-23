/**
 * Represents a winscreen object that extends DrawableObject.
 */
 class Winscreen extends DrawableObject {

    /**
     * Constructs a new Winscreen object.
     */
    constructor() {
        super().loadImage('img/9_intro_outro_screens/win/win.png');
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}
