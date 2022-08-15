import React, {FC, useEffect, useState} from 'react';
import {Direction} from "../../domain/Direction";
import Card from "../common/Card/Card";
import {Link} from "react-router-dom";
import GameMap from "../../domain/GameMap";
import {TileType} from "../../domain/TileType";
import Button from "../common/controls/Button";
import Input from "../common/controls/Input";
import '../game/game-field/GameFieldPresenter.css';


const MapEditor: FC = () => {
    const [mapWidth, setMapWidth] = useState<number>(30)
    const [mapName, setMapName] = useState<string>("new_map_1")
    const [mapHeight, setMapHeight] = useState<number>(30)
    const [mapDraft, setMapDraft] = useState<GameMap>({
        startDirection: Direction.Right,
        startLocation: {X: 8, Y: 8},
        tiles: Array(mapHeight).fill(TileType.Empty).map(() => Array(mapWidth).fill(0))
    })

    useEffect(() => {
        if (mapWidth !== mapDraft.tiles[0].length) {
            const newMapDraft = {...mapDraft}

            if (mapWidth > mapDraft.tiles[0].length) {
                newMapDraft.tiles = newMapDraft.tiles.map(row => row.concat(Array(mapWidth - row.length).fill(0)) as TileType[])
            } else {
                newMapDraft.tiles = newMapDraft.tiles.map((row, index) =>
                    row.splice(mapWidth - 1, newMapDraft.tiles[index].length - mapWidth))
            }

            setMapDraft(newMapDraft)
        }
    }, [mapDraft, mapWidth])

    useEffect(() => {
        if (mapHeight !== mapDraft.tiles.length) {
            const newMapDraft = {...mapDraft}

            if (mapHeight > mapDraft.tiles.length) {
                newMapDraft.tiles = newMapDraft.tiles.concat(Array(mapHeight - newMapDraft.tiles.length).fill(Array(mapWidth).fill(0)))
            } else {
                newMapDraft.tiles = newMapDraft.tiles.splice(mapHeight - 1, newMapDraft.tiles.length - mapHeight)
            }

            setMapDraft(newMapDraft)
        }
    }, [mapDraft, mapHeight, mapWidth])

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


    return <div id="game" className="flex justify-start items-center space-x-4 mx-auto w-full">
        <Card className="space-y-2">
            <div className="flex justify-between">
                <Link to="..">
                    {"<--"} Go back
                </Link>
                <Input type="text" label={"Map name"} value={mapName} onChange={(e) => setMapName(e.target.value)}/>
                <Button onClick={() => downloadTextFile(JSON.stringify(mapDraft), `${mapName}.json`)}>
                    Download draft
                </Button>
            </div>
            <div className="flex justify-end space-x-1 items-center">
                width
                <Button onClick={() => mapWidth > 1 && setMapWidth(prevState => prevState - 1)}>
                    -
                </Button>
                <Input type="text" label={"Map width"} value={mapWidth}/>
                <Button onClick={() => setMapWidth(prevState => prevState + 1)}>
                    +
                </Button>
            </div>
            <div className="flex justify-end space-x-1 items-center">
                height
                <Button onClick={() => mapWidth > 1 && setMapHeight(prevState => prevState - 1)}>
                    -
                </Button>
                <Input type="text" label={"Map height"} value={mapHeight}/>
                <Button onClick={() => setMapHeight(prevState => prevState + 1)}>
                    +
                </Button>
            </div>
        </Card>
        <div id="game-field-presenter" className="grid justify-center border-2 border-slate-900 min-h-0 h-auto"
             style={{gridTemplateColumns: `repeat(${mapDraft.tiles[0].length}, 1fr`}}>
            {mapDraft.tiles.map((row, x) =>
                row.map((tile, y) => <button
                    onClick={() => transformTile(x, y)}
                    className={`aspect-square tile tile-${mapDraft.tiles[x][y]} border border-dashed border-slate-400 hover:border-4`}
                    style={{width: `calc(80vh / ${mapDraft.tiles[0].length})`, maxWidth: `calc(80vh / ${mapDraft.tiles.length})`}}
                    key={`${x}-${y}`}/>)
            )}
        </div>
    </div>
}

export default MapEditor
