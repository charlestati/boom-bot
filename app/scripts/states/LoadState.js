class LoadState extends Phaser.State {
  preload() {
    this.loadingImage = this.add.sprite(this.world.width / 2, this.world.height / 2, 'loading');
    this.loadingImage.anchor.set(0.5);
    this.loadingImage.scale.set(0.5);

    this.load.tilemap('test', 'maps/test.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tilesheet', 'images/tilesheet.png');
    this.load.image('background', 'images/background.png');
    this.load.image('bullet', 'images/bullet.png');
    this.load.spritesheet('humstar', 'images/humstar.png', 32, 32);
    this.load.spritesheet('humstar_blue', 'images/humstar_blue.png', 32, 32);

    this.load.audio('intro', 'audio/intro.mp3');
    this.load.audio('loop1', 'audio/loop1.mp3');
    this.load.audio('loop2', 'audio/loop2.mp3');
    this.load.audio('sonic1', 'audio/sonic1.mp3');
    this.load.audio('sonic2', 'audio/sonic2.mp3');
    this.load.audio('sonic4', 'audio/sonic4.mp3');
    this.load.audio('win', 'audio/win.mp3');
    this.load.audio('loss', 'audio/loss.mp3');

    this.load.audio('reload', 'audio/reload.mp3');
    this.load.audio('shell', 'audio/shell.mp3');
    this.load.audio('shoot', 'audio/shoot.mp3');
  }

  create() {
    this.state.start('menu');
  }
}

export default LoadState;
