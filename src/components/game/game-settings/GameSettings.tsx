import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import HttpMapService from "../../../service/HttpMapService";
import Card from "../../common/Card/Card";
import Select from "../../common/controls/Select";
import Input from "../../common/controls/Input";
import ButtonLink from "../../common/controls/ButtonLink";


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

    function handleSpeedChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        if (value >= 1 && value <= 10) {
            setSpeed(value)
        }
    }

    function handleMapChange(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedMap(String(event.currentTarget.value))
    }

    return (
        <Card>
            <ul className="space-y-2 p-2">
                <li className="flex justify-between align-middle">
                    <p>Speed:</p>
                    <Input className="w-4/6" label="speed" id="speed" type="number" onChange={handleSpeedChange}
                           value={speed}/>
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
        </Card>
    );
}

export default GameSettings;
