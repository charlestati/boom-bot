import Game from './Game';

const game = new Game();

window.onbeforeunload = () => {
  const msg = 'Are you sure you want to leave?';
  return msg;
};

game.run();
