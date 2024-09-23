/**
 * Represents a character object that extends MoveableObject.
 */
 class Character extends MoveableObject {
  height = 250;
  y = 181;
  speed = 7;
  lastMove = 0


  /**
   * Array containing paths to images representing the character walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  /**
   * Array containing paths to images representing the character jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  /**
   * Array containing paths to images representing the character dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  /**
   * Array containing paths to images representing the character hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  /**
   * Array containing paths to images representing the character idle animation.
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',

  ]

  /**
   * The world the character belongs to.
   */
  world;

  /**
   * The walking sound of the character.
   * @type {Audio}
   */
  walking_sound = new Audio('audio/walking.mp3');

  /**
   * The jumping sound of the character.
   * @type {Audio}
   */
  jumping_sound = new Audio('audio/jump.mp3');

  /**
   * The music played by the character.
   * @type {Audio}
   */
  music = new Audio('audio/music.mp3');

  /**
   * The game music played by the character.
   * @type {Audio}
   */
  gameSound = new Audio('audio/gamemusic.mp3');

  /**
   * Constructs a new Character object.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts character animations.
   */
  animate() {
    setInterval(() => { this.characterMove() }, 1000 / 60);
    this.characterImagesInterval = setInterval(() => { this.characterAnimation() }, 90);
    this.jumpingInterval = setInterval(() => { this.jumpingAnimation() }, 200)
  }

  /**
   * Animates the character based on its state.
   */
  characterAnimation() {
    if (!this.isAboveGround()) {
      if (this.isHurt())
        this.playAnimation(this.IMAGES_HURT);
      else if (this.isDead())
        this.playAnimation(this.IMAGES_DEAD);
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
        this.playAnimation(this.IMAGES_WALKING);
      else if (!this.checkTimeCharacterMoved()) {
        this.playAnimation(this.IMAGES_LONG_IDLE)
      }
      else
        this.playAnimation(this.IMAGES_IDLE);
    }
  }

  checklastTimeCharacterMoved(){
    if (this.canMoveLeft() || this.canMoveRight() || this.canJump()|| this.world.keyboard.D ) {  
      this.lastMove = new Date().getTime();
    }
}

  checkTimeCharacterMoved(){
    let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed < 3;
  }

  /**
   * Animates the character jumping.
   */
  jumpingAnimation() {
    if (this.isAboveGround()) {
      this.playAnimationWithEnd(this.IMAGES_JUMPING);
    }
  }

  /**
   * Moves the character based on input and updates game state.
   */
  characterMove() {
    this.walking_sound.pause();
    if (this.canMoveRight())
      this.moveRight();
    if (this.canMoveLeft())
      this.moveLeft();
    if (this.canJump()) {
      this.jump();
    }
    this.checklastTimeCharacterMoved();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} - True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 500
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} - True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return !this.isDead() && this.world.keyboard.LEFT && this.x > 0
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} - True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.walking_sound.play();
    this.otherDirection = false;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.walking_sound.play();
    this.otherDirection = true;
  }

  /**
   * Makes the character jump.
   */
  jump() {
    super.jump();
    this.jumping_sound.play();
  }
}
