import React, {FC, useEffect, useState} from 'react';
import {Direction} from "../../domain/Direction";
import Card from "../common/Card/Card";
import {Link} from "react-router-dom";
import GameMap from "../../domain/GameMap";
import {TileType} from "../../domain/TileType";
import Button from "../common/controls/Button";
import Input from "../common/controls/Input";


const Game: FC = () => {
    const [mapWidth, setMapWidth] = useState<number>(30)
    const [mapName, setMapName] = useState<string>("new_map_1")
    const [mapHeight, setMapHeight] = useState<number>(30)
    const [mapDraft, setMapDraft] = useState<GameMap>({
        startDirection: Direction.Right,
        startLocation: {X: 8, Y: 8},
        tiles: Array(mapHeight).fill(TileType.Empty).map(() => Array(mapWidth).fill(0))
    })

    function transformTile(x: number, y: number) {
        const newMapDraft = {...mapDraft}

        const newTileType = newMapDraft.tiles[x][y] + 1
        if (newTileType > TileType.Wall) {
            newMapDraft.tiles[x][y] = TileType.Empty
        } else {
            newMapDraft.tiles[x][y] = newTileType
        }

        setMapDraft(newMapDraft)
    }

    function downloadTextFile(text: string, name: string) {
        const a = document.createElement('a');
        const type = name.split(".").pop();
        a.href = URL.createObjectURL(new Blob([text], {type: `text/${type === "txt" ? "plain" : type}`}));
        a.download = name;
        a.click();
    }

    useEffect(() => {

        document.addEventListener('keydown', function (e) {
            let newDirection: Direction | undefined = undefined
            switch (e.code) {
                case "ArrowLeft":
                    newDirection = Direction.Left
                    break;
                case "ArrowUp":
                    newDirection = Direction.Top
                    break;
                case "ArrowRight":
                    newDirection = Direction.Right
                    break;
                case "ArrowDown":
                    newDirection = Direction.Down
                    break;
                case "Space":
                    break;
            }
        })
    }, [])


    return <div id="game" className="space-y-4 max-w-[80vh] mx-auto w-full">
        <Card>
            <div className="flex justify-between">
                <Link to="..">
                    {"<--"} Go back
                </Link>
                <Input type="text" label={"Map name"} value={mapName} onChange={(e) => setMapName(e.target.value)}/>
                <Button onClick={() => downloadTextFile(JSON.stringify(mapDraft), `${mapName}.json`)}>
                    Download draft
                </Button>
            </div>
        </Card>
        <div id="game-field-presenter" className="overflow-hidden">
            <div className="grid flex justify-center"
                 style={{gridTemplateColumns: `repeat(${mapDraft.tiles[0].length}, 1fr`}}>
                {mapDraft.tiles.map((row, x) =>
                    row.map((tile, y) => <button
                        onClick={() => transformTile(x, y)}
                        className={`aspect-square tile tile-${mapDraft.tiles[x][y]} hover:border-2 border-slate-800`}
                        style={{maxWidth: `calc(80vh / ${mapDraft.tiles[0].length})`}}
                        key={`${x}-${y}`}/>)
                )}
            </div>
        </div>
    </div>
}

export default Game
