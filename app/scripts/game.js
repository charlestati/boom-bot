import BootState from './states/BootState';
import LoadState from './states/LoadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';

class Game extends Phaser.Game {
  constructor() {
    const config = {
      width: 800,
      height: 600,
      renderer: Phaser.AUTO,
      parent: 'boom',
      resolution: window.devicePixelRatio,
    };

    super(config);

    this.state.add('boot', BootState, false);
    this.state.add('load', LoadState, false);
    this.state.add('menu', MenuState, false);
    this.state.add('game', GameState, false);
  }

  run() {
    this.state.start('boot');
  }
}

export default Game;
