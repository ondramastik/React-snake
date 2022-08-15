import React, {FC, useEffect, useState} from 'react';
import {Direction} from "../../domain/Direction";
import GameMap from "../../domain/GameMap";
import {TileType} from "../../domain/TileType";
import Button from "../common/controls/Button";
import Input from "../common/controls/Input";
import '../game/game-field/GameFieldPresenter.css';
import CardWithNavigation from "../common/Card/CardWithNavigation";
import RadioInput from "../common/controls/RadioInput";


const MapEditor: FC = () => {
    const [mapWidth, setMapWidth] = useState<number>(30)
    const [mapName, setMapName] = useState<string>("new_map_1")
    const [mapHeight, setMapHeight] = useState<number>(30)
    const [mapDraft, setMapDraft] = useState<GameMap>({
        startDirection: Direction.Right,
        startLocation: {X: 8, Y: 8},
        tiles: Array(mapHeight).fill(TileType.Empty).map(() => Array(mapWidth).fill(0))
    })
    const [selectingStartLocation, setSelectingStartLocation] = useState(false)

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

    function handleTileClick(x: number, y: number) {
        if (selectingStartLocation) {
            const newMapDraft = {...mapDraft}
            newMapDraft.startLocation = {X: x, Y: y}
            setMapDraft(newMapDraft)
            setSelectingStartLocation(false)
        } else {
            transformTile(x, y)
        }
    }

    function handleDirectionChange(direction: string) {
        const newMapDraft = {...mapDraft}
        newMapDraft.startDirection = direction as unknown as Direction
        setMapDraft(newMapDraft)
    }

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

    return <div id="game" className="flex justify-start items-center space-x-4 mx-auto w-full">
        <CardWithNavigation className="space-y-2 text-center">
            <p className="text-slate-900">Start location</p>
            <div className="flex justify-between">
                <Button className="flex-none" disabled={selectingStartLocation}
                        onClick={() => setSelectingStartLocation(true)}>
                    Set
                </Button>
                <div
                    className={`${selectingStartLocation ? "text-yellow-700" : "text-slate-900"} flex justify-end space-x-2 font-bold`}>
                    <p>
                        X: {mapDraft.startLocation.X}
                    </p>
                    <p>
                        Y: {mapDraft.startLocation.Y}
                    </p>
                </div>
            </div>
            <p className="text-slate-900">Start direction</p>
            <div className="flex justify-between">
                <RadioInput value={mapDraft.startDirection.toString()} onChange={handleDirectionChange}
                            options={{
                                Left: Direction.Left.toString(),
                                Right: Direction.Right.toString(),
                                Top: Direction.Top.toString(),
                                Down: Direction.Down.toString()
                            }}/>
            </div>
            <p className="text-slate-900">Width</p>
            <div className="flex justify-between items-center">
                <Button onClick={() => setMapWidth(prevState => prevState - 1)} disabled={mapWidth <= 1}>
                    -
                </Button>
                <Input type="text" label={"Map width"} value={mapWidth}/>
                <Button onClick={() => setMapWidth(prevState => prevState + 1)}>
                    +
                </Button>
            </div>
            <p className="text-slate-900">Height</p>
            <div className="flex justify-between items-center">
                <Button onClick={() => setMapHeight(prevState => prevState - 1)} disabled={mapHeight <= 1}>
                    -
                </Button>
                <Input type="text" label={"Map height"} value={mapHeight}/>
                <Button onClick={() => setMapHeight(prevState => prevState + 1)}>
                    +
                </Button>
            </div>
            <p className="text-slate-900">Map name</p>
            <div className="flex justify-between space-x-2">
                <Input type="text" label={"Map name"} value={mapName} onChange={(e) => setMapName(e.target.value)}/>
                <Button onClick={() => downloadTextFile(JSON.stringify(mapDraft), `${mapName}.json`)}>
                    Download draft
                </Button>
            </div>
        </CardWithNavigation>
        <div id="game-field-presenter" className="grid justify-center border-2 border-slate-900 min-h-0 h-auto"
             style={{gridTemplateColumns: `repeat(${mapDraft.tiles[0].length}, 1fr`}}>
            {mapDraft.tiles.map((row, x) =>
                row.map((tile, y) => <button
                    onClick={() => handleTileClick(x, y)}
                    className={`aspect-square tile tile-${mapDraft.tiles[x][y]} border border-dashed border-slate-400 hover:border-4`}
                    style={{
                        width: `calc(80vh / ${mapDraft.tiles[0].length})`,
                        maxWidth: `calc(80vh / ${mapDraft.tiles.length})`
                    }}
                    key={`${x}-${y}`}/>)
            )}
        </div>
    </div>
}

export default MapEditor
