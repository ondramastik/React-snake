import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameMeta from "../../../domain/GameMeta";
import {TileType} from "../../../domain/TileType";
import GameMap from "../../../domain/GameMap";
import Coordinates from "../../../domain/Coordinates";

interface Props {
    gameMap: GameMap
    gameMeta: GameMeta
}

const resolveTile = (gameMap: GameMap, gameField: GameMeta, pos: Coordinates) => {
    if (gameField.snakeTiles.filter(location => location.X === pos.X && location.Y === pos.Y).length > 0) {
        return TileType.Snake
    } else if (gameField.foodLocation.X === pos.X && gameField.foodLocation.Y === pos.Y) {
        return TileType.Food
    }

    return gameMap.tiles[pos.X][pos.Y]
}


const GameFieldPresenter: FC<Props> = ({gameMap, gameMeta}) => {
    return <div id="game-field-presenter" className="overflow-hidden">
        <div className="grid flex justify-center"
             style={{gridTemplateColumns: `repeat(${gameMap.tiles[0].length}, 1fr`}}>
            {gameMap.tiles.map((row, x) =>
                row.map((tile, y) => <div
                    className={`aspect-square tile tile-${gameMap.tiles[x][y]} relative`}
                    style={{maxWidth: `calc(80vh / ${gameMap.tiles[0].length})`}}
                    key={`${x}-${y}`}>
                    {gameMeta.foodLocation.X === x && gameMeta.foodLocation.Y === y &&
                        <div className="z-50 absolute top-0 left-0 h-full w-full tile tile-4"/>}
                    {gameMeta.snakeTiles.some(tile => tile.X === x && tile.Y === y) &&
                        <div className="z-50 absolute top-0 left-0 h-full w-full tile tile-3"/>}
                </div>)
            )}
        </div>
    </div>
}

export default GameFieldPresenter
