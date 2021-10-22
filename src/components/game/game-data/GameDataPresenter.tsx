import React, {FC} from 'react';
import GameView from "../../../domain/GameView";

interface Props {
  gameView: GameView
  speed: number
}

const GameDataPresenter: FC<Props> = ({gameView, speed}) =>
  <div id="game-data-presenter">
    <h2>Score: {gameView.snakeTiles.length - 1}</h2>
    <h2>Speed: {speed}</h2>
    {gameView.errors.length > 0 && <ul>
      {gameView.errors.map(error => <li key={error.message}>{error.message}</li>)}
    </ul>}
  </div>


export default GameDataPresenter
