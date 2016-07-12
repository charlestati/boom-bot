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

    // todo Fix the players falling through the platforms
    this.setupPlayers();

    // todo Check how to follow two players
    // this.camera.follow(this.players[0].sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    this.setupBullets();

    this.music = this.add.audio('sonic1');
    this.music.loopFull(1);

    this.setupHud();

    // todo Debug
    const debug = true;
    if (debug) {
      this.collisionsLayer.debug = true;
    } else {
      this.collisionsLayer.visible = false;
    }
  }

  update() {
    for (let i = 0; i < this.players.length; ++i) {
      this.physics.arcade.collide(this.players[i].sprite, this.collisionsLayer);

      this.physics.arcade.collide(this.bullets,
        this.players[i].sprite,
        this.collisionHandler, null, this);

      this.players[i].update();
    }

    this.physics.arcade.collide(this.bullets,
      this.collisionsLayer,
      this.collisionsLayerHandler, null, this);

    this.updateHud();
  }

  collisionHandler(player, bullet) {
    if (bullet.shooter === player) {
      return;
    }

    player.body.maxVelocity.x = 1000;

    // todo Wrong direction when players overlap
    if (bullet.x < player.x) {
      player.body.acceleration.x = bullet.shootKnockback;
    } else {
      player.body.acceleration.x = bullet.shootKnockback * -1;
    }

    bullet.kill();

    this.time.events.add(Phaser.Timer.HALF, () => {
      player.body.maxVelocity.x = 250;
    }, this);
  }

  collisionsLayerHandler(bullet, layer) {
    if (layer.layer.name === 'collisions') {
      bullet.kill();
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

    this.input.gamepad.start();

    const controlsPlayer1 = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      grenade: this.input.keyboard.addKey(Phaser.Keyboard.ALT),
      pad: this.input.gamepad.pad1,
    };

    const controlsPlayer2 = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.G),
      grenade: this.input.keyboard.addKey(Phaser.Keyboard.H),
      pad: this.input.gamepad.pad2,
    };

    this.players = [];
    this.players.push(new Humstar(spawnRange, controlsPlayer1, this));
    this.players.push(new Humstar(spawnRange, controlsPlayer2, this));
    this.players[1].sprite.loadTexture('humstar_blue', 0, false);
  }

  setupHud() {
    this.scoreText = this.add.text(10, 10, `Red: ${this.players[0].lives}\nBlue: ${this.players[1].lives}`,
      {
        font: '16px Arial',
        fill: '#ffffff',
      });
    this.ammoText = this.add.text(10, 80, `Red: ${this.players[0].ammo} bullets\nBlue: ${this.players[1].ammo} bullets`,
      {
        font: '16px Arial',
        fill: '#ffffff',
      });
  }

  updateHud() {
    this.scoreText.setText(`Red: ${this.players[0].lives}\nBlue: ${this.players[1].lives}`);
    this.ammoText.setText(`Red: ${this.players[0].ammo} bullets\nBlue: ${this.players[1].ammo} bullets`);
  }

  stop() {
    this.music.stop();
    this.state.start('menu');
  }
}

export default GameState;
