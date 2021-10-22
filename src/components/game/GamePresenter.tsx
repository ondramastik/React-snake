import React, {FC} from 'react';
import GameView from "../../domain/GameView";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import GameDataPresenter from "./game-data/GameDataPresenter";
import GameMap from "../../domain/GameMap";

interface Props {
  map: GameMap
  gameView: GameView
  speed: number
}

const GamePresenter: FC<Props> = ({map, gameView, speed}) =>
  <div id="game-presenter">
    <GameFieldPresenter map={map}
                        gameView={gameView}/>
    <GameDataPresenter gameView={gameView} speed={speed}/>
  </div>


export default GamePresenter
