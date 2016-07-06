import Humstar from '../entities/Humstar';

class GameState extends Phaser.State {
  create() {
    this.bg = this.add.tileSprite(0, 0, 800, 600, 'background');
    this.bg.fixedToCamera = true;

    this.tilemap = this.add.tilemap('test');
    this.tilemap.addTilesetImage('tilesheet');

    this.platformsLayer = this.tilemap.createLayer('platforms');
    this.platformsLayer.resizeWorld();

    this.collisionsLayer = this.tilemap.createLayer('collisions');
    this.tilemap.setCollisionBetween(1, 10000, true, this.collisionsLayer);

    // todo Use a good range
    // todo Fix the players falling through the platforms
    this.setupPlayers();

    // todo Check how to follow two players
    // this.camera.follow(this.players[0].sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    this.setupBullets();

    this.music = this.add.audio('sonic1');
    this.music.loopFull(1);

    // todo Debug
    const debug = false;
    if (debug) {
      this.collisionsLayer.debug = true;
    } else {
      this.collisionsLayer.visible = false;
    }
  }

  update() {
    for (let i = 0; i < this.players.length; ++i) {
      this.physics.arcade.collide(this.players[i].sprite, this.collisionsLayer);
      this.players[i].update();
    }
  }

  setupBullets() {
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('angle', 90);
  }

  setupPlayers() {
    const spawnRange = [
      [100, 600],
    ];

    const controlsPlayer1 = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      grenade: this.input.keyboard.addKey(Phaser.Keyboard.ALT),
    };

    const controlsPlayer2 = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.G),
      grenade: this.input.keyboard.addKey(Phaser.Keyboard.H),
    };

    this.players = [];
    this.players.push(new Humstar(spawnRange, controlsPlayer1, this));
    this.players.push(new Humstar(spawnRange, controlsPlayer2, this));

    this.players[1].sprite.loadTexture('humstar_blue', 0, false);
  }

  stop() {
    this.music.stop();
    this.state.start('menu');
  }
}

export default GameState;
