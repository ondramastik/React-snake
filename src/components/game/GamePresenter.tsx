import React, {FC} from 'react';
import GameView from "../../domain/GameView";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import GameDataPresenter from "./game-data/GameDataPresenter";

interface Props {
  gameView: GameView
}

const GamePresenter: FC<Props> = ({gameView}) =>
  <div id="game-presenter">
    <GameFieldPresenter gameView={gameView}/>
    <GameDataPresenter gameView={gameView}/>
  </div>


export default GamePresenter
