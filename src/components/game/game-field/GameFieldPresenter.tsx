import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameMeta from "../../../domain/GameMeta";
import {TileType} from "../../../domain/TileType";
import GameMap from "../../../domain/GameMap";

interface Props {
    gameMap: GameMap
    gameMeta: GameMeta
}


const GameFieldPresenter: FC<Props> = ({gameMap, gameMeta}) => {
    return <div id="game-field-presenter" style={{position: "relative"}}>
        {gameMap.tiles.map(
            (row, x) => <React.Fragment>
                {row.map((tile, y) => <div
                    className={`tile tile-${gameMap.tiles[x][y]}`} key={`${x}-${y}`}/>)}
                <div/>
            </React.Fragment>)}
        <div style={{position: "absolute", top: 20 * gameMeta.foodLocation.X, left: 20 * gameMeta.foodLocation.Y}}
             className={`tile tile-${TileType.Food}`}/>
        {gameMeta.snakeTiles.map(location => <div
            style={{position: "absolute", top: 20 * location.X, left: 20 * location.Y}}
            className={`tile tile-${TileType.Snake}`}
            key={`snake-${location.X}-${location.Y}`}/>)}
    </div>
}

export default GameFieldPresenter
