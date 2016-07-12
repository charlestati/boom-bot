class MenuState extends Phaser.State {
  create() {
    // todo Just for faster dev
    this.state.start('game');
    return;

    // todo Show Menu: Local multiplayer & Online play

    this.add.text(80, this.world.height - 80, 'Press Enter to play', {
      font: '25px Arial',
      fill: '#333333',
    });

    const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);

    this.music = this.add.audio('intro');
    this.music.loopFull(1);
  }

  start() {
    this.music.stop();
    this.state.start('game');
  }
}

export default MenuState;
