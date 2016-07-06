class BootState extends Phaser.State {
  preload() {
    this.load.image('loading', 'images/loading.png');
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#ffffff';
  }

  create() {
    this.state.start('load');
  }
}

export default BootState;
