import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameField from "../../../domain/GameField";

interface Props {
  gameField: GameField
}

const GameFieldPresenter: FC<Props> = ({gameField}) => {
  return <div id="game-field-presenter">
    {gameField.tiles.map(
      (row, x) => <React.Fragment>
        {row.map((tile, y) => <div className={`tile tile-${tile}`} key={`${x}-${y}`}/>)}
        <div/>
      </React.Fragment>)}
  </div>
}

export default GameFieldPresenter
