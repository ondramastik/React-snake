import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import HttpMapService from "../../../service/HttpMapService";
import Select from "../../common/controls/Select";
import Input from "../../common/controls/Input";
import ButtonLink from "../../common/controls/ButtonLink";
import Button from "../../common/controls/Button";
import CardWithNavigation from "../../common/Card/CardWithNavigation";


const GameSettings: FC = () => {
    const [mapService] = useState(new HttpMapService())

    const [mapList, setMapList] = useState<string[]>()
    const [mapListLoaded, setMapListLoaded] = useState(false)

    const [speed, setSpeed] = useState(1)
    const [selectedMap, setSelectedMap] = useState<string>()

    useEffect(() => {
        if (!mapListLoaded) {
            mapService.list()
                .then(list => {
                    setMapList(list)
                    setSelectedMap(list[0])
                })
                .then(() => setMapListLoaded(true))
        }
    })

    function changeSpeed(speed: number) {
        if (speed >= 1 && speed <= 10) {
            setSpeed(speed)
        }
    }

    function handleSpeedChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        changeSpeed(value)
    }

    function handleMapChange(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedMap(String(event.currentTarget.value))
    }

    return (
        <CardWithNavigation heading="Game settings">
            <ul className="space-y-2">
                <li className="flex justify-between align-middle">
                    <p>Speed:</p>
                    <div className="w-4/6 flex space-x-1">
                        <Button disabled={speed <= 1} onClick={() => changeSpeed(speed - 1)}>-</Button>
                        <Input label="speed" id="speed" type="number" onChange={handleSpeedChange}
                               value={speed}/>
                        <Button disabled={speed >= 10} onClick={() => changeSpeed(speed + 1)}>+</Button>
                    </div>
                </li>
                <li className="flex justify-between space-x-8 align-middle">
                    <p>Map:</p>
                    {mapListLoaded && mapList ?
                        <Select className="w-4/6" label="map" id="map" onChange={handleMapChange} value={selectedMap}
                                options={mapList}/> : "Loading map list.."}
                </li>
                <li className="flex justify-end">
                    <ButtonLink to={`play/${selectedMap}/${speed}`}>Play</ButtonLink>
                </li>
            </ul>
        </CardWithNavigation>
    );
}

export default GameSettings;
