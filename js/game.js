/**
 * Represents the canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the game world.
 * @type {World}
 */
let world;

/**
 * Hides elements related to the game's start screen.
 */
function start() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endscreen').style.display = 'none';
    document.getElementById('controlsContainer').style.display = 'none';
}

function checkDeviceAndApplyFlex() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    const isMobile = /mobile|iphone|ipod|blackberry|iemobile|opera mini|android/.test(userAgent);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (isTablet || isMobile) {
        document.getElementById('btns').style.display = 'flex';
    } else if(hasTouch === true){
        document.getElementById('btns').style.display = 'flex';
    } else {
        document.getElementById('btns').style.display = 'none';
    }
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', checkDeviceAndApplyFlex);

// Check on window resize
window.addEventListener('resize', checkDeviceAndApplyFlex);


/**
 * Initializes the game.
 * Displays the canvas and hides the start screen.
 * Creates the game world and assigns it to the global variable.
 */
function init() {
    document.getElementById('canvas').style.display = 'flex';
    document.getElementById('startscreen').style.display = 'none';
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    document.getElementById('endscreen').style.display = 'flex';
    world.run();
    initializeMute();
}

/**
 * Displays the controls container.
 */
function openControls() {
    document.getElementById('controlsContainer').style.display = 'flex';
}

/**
 * Hides the controls container.
 */
function closeControls() {
    document.getElementById('controlsContainer').style.display = 'none';
}

info = () => {
    document.getElementById('infoContainer').style.display = 'flex';
}

closeInfo = () => {
    document.getElementById('infoContainer').style.display = 'none';
}

function initializeMute() {
    world.character.gameSound.muted = true;
    world.character.walking_sound.muted = true;
    world.character.jumping_sound.muted = true;
    world.character.music.muted = true;
    document.getElementById('mutePictureCanvas').src = 'img/icon/mute.png';
}

/**
 * Toggles the mute state of game audio.
 * Updates the mute button image accordingly.
 */
function mutePlay() {
    let imgCanvas = document.getElementById('mutePictureCanvas');

    if (world.character.gameSound.muted) {
        world.character.gameSound.muted = false;
        world.character.walking_sound.muted = false;
        world.character.jumping_sound.muted = false;
        world.character.music.muted = false;
        imgCanvas.src = 'img/icon/speaker.png';
    } else {
        world.character.gameSound.muted = true;
        world.character.walking_sound.muted = true;
        world.character.jumping_sound.muted = true;
        world.character.music.muted = true;
        imgCanvas.src = 'img/icon/mute.png';
    }
    document.getElementById('muteButtonCanvas').blur();
}

/**
 * Event listener for keydown events.
 * Sets corresponding property of the keyboard object to true based on the pressed key.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event listener for keyup events.
 * Sets the corresponding property of the keyboard object to false based on the released key.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
