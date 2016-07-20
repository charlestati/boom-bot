class Player {
  constructor(spawnRange, controls, state) {
    this.spawnRange = spawnRange;
    this.controls = controls;
    this.state = state;

    this.spawnHeight = -1000;

    this.facing = 'right';
    this.acceleration = 600;
    this.jumpVelocity = 900;

    this.lives = 10;

    this.pausedGame = false;
  }

  update() {
    if (this.state.input.gamepad.supported
      && this.state.input.gamepad.active
      && this.controls.pad.connected) {
      this.listenGamepad();
    } else {
      this.listenKeyboard();
    }

    if (this.sprite.y > this.state.world.height) {
      this.die();
    }
  }

  listenGamepad() {
    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_START)) {
      if (this.state.paused && this.pausedGame) {
        this.state.paused = false;
      } else {
        this.state.paused = true;
        this.pausedGame = true;
      }
    }

    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_A)) {
      if (this.sprite.body.onFloor()) {
        this.sprite.body.velocity.y = this.jumpVelocity * -1;
      }
    }

    // todo Use progressive pad movement
    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)
      || this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,
        this.acceleration * -1,
        this.sprite.body.acceleration);
    } else if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)
      || this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,
        this.acceleration,
        this.sprite.body.acceleration);
    } else {
      this.sprite.body.acceleration.x = 0;
      this.sprite.angle = 0;
    }

    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)) {
      this.fire();
    }

    if (this.controls.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)) {
      console.log('boom!');
    }
  }

  listenKeyboard() {
    if (this.controls.left.isDown) {
      this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,
        this.acceleration * -1,
        this.sprite.body.acceleration);
    } else if (this.controls.right.isDown) {
      this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,
        this.acceleration,
        this.sprite.body.acceleration);
    } else {
      this.sprite.body.acceleration.x = 0;
    }

    if (this.controls.up.isDown) {
      if (this.sprite.body.onFloor()) {
        this.sprite.body.velocity.y = this.jumpVelocity * -1;
      }
    }

    if (this.controls.shoot.isDown) {
      this.fire();
    }
  }

  die() {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.sounds.play('winner');
      this.state.stop();
    } else {
      this.sprite.y = this.spawnHeight;
      this.sprite.x = Player.getSpawnPosition(this.spawnRange);
    }
  }

  static getSpawnPosition(spawnRange) {
    const range = spawnRange[Math.floor(Math.random() * spawnRange.length)];
    return Math.random() * (range[1] - range[0]) + range[0];
  }
}

export default Player;
