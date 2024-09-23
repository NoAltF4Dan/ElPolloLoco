/**
 * Represents an end screen object that extends DrawableObject.
 */
 class Endscreen extends DrawableObject {

    /**
     * Constructs a new Endscreen object.
     */
    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/game over.png');
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}
