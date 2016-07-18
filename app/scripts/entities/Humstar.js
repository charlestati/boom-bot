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

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.acceleration = 1000;
    this.sprite.body.drag.x = 300;
    this.sprite.body.maxVelocity.x = 250;
    this.sprite.body.maxVelocity.y = 1000;
    this.sprite.body.gravity.y = 1500;
    this.sprite.body.bounce.y = 0;

    this.sprite.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.play('fly');

    // todo Use a Weapon class
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

    this.nextGrenade = 0;
    this.grenades = 3;
    this.grenadeRate = 200;
    this.grenadeStrength = 0;
    this.grenadeStrengthMax = 100;
  }

  update() {
    super.update();

    if (this.ammo <= 0 && this.state.time.now >= this.reloadingEnd) {
      this.ammo = this.weaponMagazine;

      this.reloadSound.play();
    }

    if (this.state.input.gamepad.supported
      && this.state.input.gamepad.active
      && this.controls.pad.connected) {
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

    if (this.controls.grenade.isDown && this.grenades > 0) {
      console.log(this.grenadeStrength)
      if (this.grenadeStrength < this.grenadeStrengthMax) {
        this.grenadeStrength += 1;
      }
    } else if (this.grenadeStrength > 0) {
      this.throwGrenade(this.grenadeStrength);
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

  throwGrenade() {
    if (this.grenades <= 0
      || this.state.time.now < this.nextGrenade
      || this.state.grenades.countDead() <= 0) {
      return;
    }

    const grenade = this.state.grenades.getFirstDead();
    grenade.reset(this.sprite.x, this.sprite.y);

    this.state.physics.arcade.velocityFromRotation(this.facing === 'right' ? -45 : -90,
      this.grenadeStrength * 10,
      grenade.body.velocity);

    this.grenades -= 1;
    this.nextGrenade = this.state.time.now + this.grenadeRate;
    this.grenadeStrength = 0.0;

    this.state.time.events.add(1800, () => {
      for (let i = 0; i < this.state.players.length; ++i) {
        const explosion = this.state.add.sprite(grenade.x, grenade.y, 'explosion');
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.8;
        explosion.animations.add('explode');
        explosion.animations.play('explode', 24, false, true);

        const player = this.state.players[i];
        player.sprite.body.maxVelocity.x = 1000;

        const distance = this.state.physics.arcade.distanceBetween(grenade,
          this.state.players[i].sprite);

        grenade.y -= 20;
        const angle = this.state.physics.arcade.angleBetween(grenade,
          player.sprite);

        this.state.physics.arcade.velocityFromRotation(angle,
          (1 / distance) * 100000,
          player.sprite.body.velocity);

        grenade.kill();

        this.state.time.events.add(Phaser.Timer.HALF, () => {
          player.sprite.body.maxVelocity.x = 250;
        }, this);
      }
    }, this);
  }

  die() {
    super.die();
    this.ammo = this.weaponMagazine;
    this.grenades = 3;
  }
}

export default Humstar;
