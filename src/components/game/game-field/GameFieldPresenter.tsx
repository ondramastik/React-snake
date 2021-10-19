import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameField from "../../../domain/GameField";
import Coordinates from "../../../domain/Coordinates";
import {TileType} from "../../../domain/TileType";

interface Props {
  gameField: GameField
}

const isSnakeTile = (gameField: GameField, pos: Coordinates) =>
  gameField.snakeTiles && gameField.snakeTiles.filter(location => location.X === pos.X && location.Y === pos.Y).length > 0

const GameFieldPresenter: FC<Props> = ({gameField}) => {
  return <div id="game-field-presenter">
    {gameField.tiles.map(
      (row, x) => <React.Fragment>
        {row.map((tile, y) => <div
          className={`tile tile-${isSnakeTile(gameField, {X: x, Y: y}) ? TileType.Snake : tile}`} key={`${x}-${y}`}/>)}
        <div/>
      </React.Fragment>)}
  </div>
}

export default GameFieldPresenter
