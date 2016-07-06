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

    // todo Increase acceleration
    this.sprite.body.acceleration.x = 1000;
    this.sprite.body.maxAcceleration = 10;
    this.sprite.body.drag.x = 300;
    this.sprite.body.maxVelocity.x = 250;
    this.sprite.body.maxVelocity.y = 1000;
    this.sprite.body.gravity.y = 1500;

    this.sprite.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.play('fly');

    this.nextFire = 0;
    this.fireRate = 250;
    this.bulletSpeed = 600;
    this.weaponMagazine = 12;
    this.weaponReloadTime = 1500;
    this.ammo = this.weaponMagazine;
    this.shootKnockback = 5000;
  }

  update() {
    super.update();

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
    if (this.state.time.now < this.nextFire || this.state.bullets.countDead() <= 0) {
      return;
    }

    this.nextFire = this.state.time.now + this.fireRate;

    const bullet = this.state.bullets.getFirstDead();

    this.ammo -= 1;

    if (this.ammo <= 0) {
      this.nextFire = this.state.time.now + this.weaponReloadTime;
      this.ammo = this.weaponMagazine;
      return;
    }

    if (this.facing === 'left') {
      bullet.reset(this.sprite.x - this.sprite.width / 2 + 8, this.sprite.y);
      bullet.body.velocity.x = this.bulletSpeed * -1;
      this.sprite.body.acceleration.x = this.shootKnockback;
    } else {
      bullet.reset(this.sprite.x + this.sprite.width / 2, this.sprite.y);
      bullet.body.velocity.x = this.bulletSpeed;
      this.sprite.body.acceleration.x = this.shootKnockback * -1;
    }
  }
}

export default Humstar;
