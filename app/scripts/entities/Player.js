class Player {
  constructor(spawnRange, controls, state) {
    this.spawnRange = spawnRange;
    this.controls = controls;
    this.state = state;

    this.spawnHeight = -2000;

    this.facing = 'right';
    this.acceleration = 600;
    this.jumpVelocity = 900;

    this.death = 0;
  }

  update() {
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

    if (this.controls.grenade.isDown) {
      console.log('boom!');
    }

    if (this.sprite.y > this.state.world.height) {
      this.die();
    }
  }

  die() {
    this.death += 1;
    if (this.death >= 10) {
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

  fire() {
    console.log('Pew!');
  }
}

export default Player;
