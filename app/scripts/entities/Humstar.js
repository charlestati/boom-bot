import Player from './Player';

class Humstar extends Player {
  constructor(spawnRange, controls, state) {
    super(spawnRange, controls, state);

    const spawnPosition = Player.getSpawnPosition(this.spawnRange);

    this.sprite = this.state.add.sprite(spawnPosition, this.spawnHeight, 'humstar');
    this.state.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.checkCollision.up = false;

    this.sprite.scale.set(2);
    this.sprite.smoothed = false;

    this.sprite.anchor.setTo(0.5, 0.5);

    this.acceleration = 1000;
    this.sprite.body.drag.x = 300;
    this.sprite.body.maxVelocity.x = 250;
    this.sprite.body.maxVelocity.y = 1000;
    this.sprite.body.gravity.y = 1500;

    this.sprite.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.play('fly');

    this.nextFire = 0;
    this.fireRate = 250;
    this.bulletSpeed = 1000;
    this.weaponMagazine = 12;
    this.weaponReloadTime = 1500;
    this.ammo = this.weaponMagazine;
    this.shootKnockback = 1200;

    this.fallPosition = this.sprite.y;
    this.falling = false;

    this.shootSound = this.state.add.audio('shoot');
    this.shellSound = this.state.add.audio('shell');
    this.reloadSound = this.state.add.audio('reload');
  }

  update() {
    super.update();

    if (this.ammo <= 0 && this.state.time.now >= this.reloadingEnd) {
      this.ammo = this.weaponMagazine;

      this.reloadSound.play();
    }

    if (this.state.input.gamepad.supported && this.state.input.gamepad.active && this.controls.pad.connected) {
      this.listenGamepad();
    } else {
      this.listenKeyboard();
    }
  }

  // todo Reload after 1 sec without shooting
  listenGamepad() {
    super.listenGamepad();

    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)
      || this.controls.pad.isDown(Phaser.Gamepad.XBOX360_B)) {
      if (!this.falling) {
        this.sprite.body.checkCollision.down = false;
        this.fallPosition = this.sprite.y;
        this.falling = true;
      }
    } else if (!this.sprite.body.checkCollision.down) {
      if (this.sprite.y > this.fallPosition + 20) {
        this.sprite.body.checkCollision.down = true;
        this.falling = false;
      }
    }

    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)
      || this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.sprite.angle = -20;
      this.facing = 'left';
    } else if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)
      || this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.sprite.angle = 20;
      this.facing = 'right';
    }
  }

  listenKeyboard() {
    super.listenKeyboard();

    if (this.controls.down.isDown) {
      if (!this.falling) {
        this.sprite.body.checkCollision.down = false;
        this.fallPosition = this.sprite.y;
        this.falling = true;
      }
    } else if (!this.sprite.body.checkCollision.down) {
      if (this.sprite.y > this.fallPosition + 20) {
        this.sprite.body.checkCollision.down = true;
        this.falling = false;
      }
    }

    if (this.controls.left.isDown) {
      this.sprite.angle = -20;
      this.facing = 'left';
    } else if (this.controls.right.isDown) {
      this.sprite.angle = 20;
      this.facing = 'right';
    } else {
      this.sprite.angle = 0;
    }
  }

  fire() {
    if (this.state.time.now < this.nextFire
      || this.state.time.now < this.reloadingEnd
      || this.state.bullets.countDead() <= 0) {
      return;
    }

    this.nextFire = this.state.time.now + this.fireRate;

    const bullet = this.state.bullets.getFirstDead();

    bullet.shootKnockback = this.shootKnockback * 30;
    bullet.shooter = this.sprite;

    this.ammo -= 1;

    this.shootSound.play();

    this.state.time.events.add(Phaser.Timer.HALF, () => {
      this.shellSound.play();
    }, this);

    if (this.ammo <= 0) {
      this.reloadingEnd = this.state.time.now + this.weaponReloadTime;
      return;
    }

    if (this.facing === 'left') {
      bullet.reset(this.sprite.x, this.sprite.y);
      bullet.body.velocity.x = this.bulletSpeed * -1;
      this.sprite.body.acceleration.x = this.shootKnockback;
    } else {
      bullet.reset(this.sprite.x, this.sprite.y);
      bullet.body.velocity.x = this.bulletSpeed;
      this.sprite.body.acceleration.x = this.shootKnockback * -1;
    }
  }

  die() {
    super.die();
    this.ammo = this.weaponMagazine;
  }
}

export default Humstar;
