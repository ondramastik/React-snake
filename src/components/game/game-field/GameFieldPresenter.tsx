import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameView from "../../../domain/GameView";
import Coordinates from "../../../domain/Coordinates";
import {TileType} from "../../../domain/TileType";

interface Props {
  gameView: GameView
}

const resolveTile = (gameField: GameView, pos: Coordinates) => {
  if(gameField.snakeTiles.filter(location => location.X === pos.X && location.Y === pos.Y).length > 0) {
    return TileType.Snake
  } else if(gameField.foodLocation.X === pos.X && gameField.foodLocation.Y === pos.Y) {
    return TileType.Food
  }

  return gameField.tiles[pos.X][pos.Y]
}

const GameFieldPresenter: FC<Props> = ({gameView}) => {
  return <div id="game-field-presenter">
    {gameView.tiles.map(
      (row, x) => <React.Fragment>
        {row.map((tile, y) => <div
          className={`tile tile-${resolveTile(gameView, {X: x, Y: y})}`} key={`${x}-${y}`}/>)}
        <div/>
      </React.Fragment>)}
  </div>
}

export default GameFieldPresenter
