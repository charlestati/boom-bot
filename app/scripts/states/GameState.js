import Humstar from '../entities/Humstar';

class GameState extends Phaser.State {
  create() {
    const width = 1410;
    const height = 725;
    const worldOffset = 100;
    this.world.setBounds(-worldOffset, -worldOffset, 1410 + worldOffset, 725 + worldOffset);

    this.bg = this.add.tileSprite(0, 0, 1410, 725, 'background');
    this.bg.fixedToCamera = true;

    const maps = ['arena', 'line'];
    this.tilemap = this.add.tilemap(maps[Math.floor(Math.random() * maps.length)]);
    this.tilemap.addTilesetImage('tilesheet');

    this.platformsLayer = this.tilemap.createLayer('platforms');
    // this.platformsLayer.resizeWorld();

    this.camera.focusOnXY((width - worldOffset) / 2, (height - worldOffset) / 2);

    this.collisionsLayer = this.tilemap.createLayer('collisions');

    this.tilemap.setCollisionBetween(1, 10000, true, this.collisionsLayer);

    // todo Fix players passing through the platforms when going too fast
    this.setupPlayers();

    // todo Follow all the players
    // this.camera.follow(this.players[0].sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    this.setupBullets();

    this.music = this.add.audio('sonic1');
    this.music.loopFull(0.5);

    this.hitSound = this.add.audio('hit');

    this.setupHud();

    this.setupGrenades();

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

      this.physics.arcade.collide(this.bullets,
        this.players[i].sprite,
        this.collisionHandler, null, this);

      this.players[i].update();
    }

    this.physics.arcade.collide(this.bullets,
      this.collisionsLayer,
      this.collisionsLayerHandler, null, this);

    this.physics.arcade.collide(this.grenades, this.collisionsLayer);

    this.updateHud();
  }

  collisionHandler(_player, bullet) {
    const player = _player;

    if (bullet.shooter === player) {
      return;
    }

    player.body.maxVelocity.x = 1000;

    this.hitSound.play();

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

  setupPlayers() {
    const spawnRange = [
      [200, 600],
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

  setupGrenades() {
    this.grenades = this.add.group();
    this.grenades.enableBody = true;
    this.grenades.physicsBodyType = Phaser.Physics.ARCADE;

    this.grenades.createMultiple(50, 'grenade');
    this.grenades.setAll('anchor.x', 0.5);
    this.grenades.setAll('anchor.y', 0.5);
    this.grenades.setAll('body.gravity.y', 1500);
    this.grenades.setAll('body.bounce.y', 0.4);
    this.grenades.setAll('body.bounce.x', 0.4);
    this.grenades.setAll('body.drag.x', 150);
  }

  setupBullets() {
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50, 'bullet');
    // todo Allow bullets to go or come from out of bounds for skilled shots
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('angle', 90);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
  }

  setupHud() {
    this.scoreText = this.add.bitmapText(10, 0, 'nokia_white',
      `Red: ${this.players[0].lives}
Blue: ${this.players[1].lives}`, 16);

    this.ammoText = this.add.bitmapText(100, 0, 'nokia_white',
      `Red: ${this.players[0].ammo}
Blue: ${this.players[1].ammo}`, 16);

    this.grenadesText = this.add.bitmapText(250, 0, 'nokia_white',
      `Red: ${this.players[0].grenades}
Blue: ${this.players[1].grenades}`, 16);
  }

  updateHud() {
    this.scoreText.setText(`Red: ${this.players[0].lives}
Blue: ${this.players[1].lives}`);
    this.ammoText.setText(`Red: ${this.players[0].ammo} bullets
Blue: ${this.players[1].ammo} bullets`);
    this.grenadesText.setText(`Red: ${this.players[0].grenades} grenades
Blue: ${this.players[1].grenades} grenades`);
  }

  stop() {
    this.music.stop();
    this.state.start('menu');
  }
}

export default GameState;
