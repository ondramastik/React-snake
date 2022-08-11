import React, {FC} from 'react';
import './GameFieldPresenter.css';
import GameMeta from "../../../domain/GameMeta";
import GameMap from "../../../domain/GameMap";

interface Props {
    gameMap: GameMap
    gameMeta: GameMeta
}

const GameFieldPresenter: FC<Props> = ({gameMap, gameMeta}) => {
    return <div id="game-field-presenter" className="overflow-hidden">
        <div className="grid flex justify-center"
             style={{gridTemplateColumns: `repeat(${gameMap.tiles[0].length}, 1fr`}}>
            {gameMap.tiles.map((row, x) =>
                row.map((tile, y) => <div
                    className={`aspect-square tile tile-${gameMap.tiles[x][y]}`}
                    style={{maxWidth: `calc(80vh / ${gameMap.tiles[0].length})`}}
                    key={`${x}-${y}`}>
                    {gameMeta.snakeTiles.some(tile => tile.X === x && tile.Y === y) ?
                        <div className="h-full w-full tile tile-3"/> :
                        gameMeta.foodLocation.X === x && gameMeta.foodLocation.Y === y &&
                        <div className="h-full w-full tile tile-4"/>}
                </div>)
            )}
        </div>
    </div>
}

export default GameFieldPresenter
