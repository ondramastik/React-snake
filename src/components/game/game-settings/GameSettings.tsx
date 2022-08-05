import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import HttpMapService from "../../../service/HttpMapService";
import {Link} from "react-router-dom";


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
        <ul>
            <li>
                <label htmlFor="speed">Speed:</label>
                <input id="speed" type="number" onChange={handleSpeedChange} value={speed}/>
            </li>
            <li>
                <label htmlFor="map">Map:</label>
                {mapListLoaded ? <select id="map" onChange={handleMapChange}>
                    {mapList?.map(map => <option selected={selectedMap === map} key={map} value={map}>{map}</option>)}
                </select> : "Loading map list.."}
            </li>
            <li>
                <Link to={`play/${selectedMap}/${speed}`}>Play</Link>
            </li>
        </ul>
    );
}

export default GameSettings;
