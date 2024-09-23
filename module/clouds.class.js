/**
 * Represents a clouds object that extends MoveableObject.
 */
 class Clouds extends MoveableObject {

    /**
     * y-coordinate of the clouds.
     * @type {number}
     */
    y = 20;

    /**
     * height of the clouds.
     * @type {number}
     */
    height = 250;

    /**
     * width of the clouds.
     * @type {number}
     */
    width = 500;
   
    /**
     * Constructs a new Clouds object.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = 0 + Math.random() * 2500;
        this.animate();
    }

    /**
     * Animates the clouds by moving them to the left.
     */
    animate() { 
       this.cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 100); 
    }

    /**
     * Moves the clouds to the left.
     */
    moveLeft() {
        this.x -= 1; 
    }
}
