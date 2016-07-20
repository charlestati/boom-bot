import Game from './Game';

const game = new Game();

window.onbeforeunload = () => {
  return 'Are you sure you want to leave?';
};

game.run();
