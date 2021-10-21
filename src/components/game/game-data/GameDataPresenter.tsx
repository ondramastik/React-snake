import React, {FC} from 'react';
import GameView from "../../../domain/GameView";

interface Props {
  gameView: GameView
}

const GameDataPresenter: FC<Props> = ({gameView}) =>
  <div id="game-data-presenter">
    <h2>Score: {gameView.snakeTiles.length - 1}</h2>
    {gameView.errors.length > 0 && <ul>
      {gameView.errors.map(error => <li>{error.message}</li>)}
    </ul>}
  </div>


export default GameDataPresenter
