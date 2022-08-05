import React, {useEffect, useState} from 'react';
import SnakeService from "../service/SnakeService";
import Game from "./game/Game";
import {SnakeServiceContext} from "../context/SnakeServiceContext";
import {MapServiceContext} from "../context/MapServiceContext";
import HttpMapService from "../service/HttpMapService";
import ISnakeService from "../domain/service/SnakeService";

function App() {
    const [mapService] = useState(new HttpMapService())
    const [snakeService, setSnakeService] = useState<ISnakeService>()

    useEffect(() => {
        if (!snakeService) {
            mapService.load("map2")
                .then(map => setSnakeService(new SnakeService(map)))
        }
    })

    return (
        <div className="App">
            {snakeService && <SnakeServiceContext.Provider value={snakeService}>
                <MapServiceContext.Provider value={mapService}>
                    <Game/>
                </MapServiceContext.Provider>
            </SnakeServiceContext.Provider>}
        </div>
    );
}

export default App;
