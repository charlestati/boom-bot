class MenuState extends Phaser.State {
  create() {
    this.bg = this.add.tileSprite(0, 0, 1410, 725, 'background');

    const centerX = this.world.width / 2;
    const centerY = this.world.height / 2;

    this.button = this.add.button(centerX, centerY, 'button', () => {
      this.start();
    }, this, 0, 1, 2);
    this.button.scale.set(1, 1.5);
    this.button.smoothed = false;
    this.button.anchor.x = 0.5;
    this.button.anchor.y = 0.5;

    this.text = this.add.bitmapText(this.button.x - this.button.width / 2,
      this.button.y - this.button.height / 2 + 7, 'nokia', 'Play', 16);
    this.text.x += (this.button.width / 2) - (this.text.textWidth / 2);

    const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);

    this.music = this.add.audio('intro');
    this.music.loopFull(0.5);
  }

  start() {
    this.music.stop();
    this.state.start('game');
  }
}

export default MenuState;
