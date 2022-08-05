import React, {FC, useContext, useEffect, useState} from 'react';
import ISnakeService from "../../domain/service/SnakeService";
import {useParams} from "react-router-dom";
import IMapService from "../../domain/service/IMapService";
import {MapServiceContext} from "../../context/MapServiceContext";
import SnakeService from "../../service/SnakeService";
import Game from "./Game";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";

interface GameParams {
    map: string
    speed: number
}

const GameContainer: FC = () => {
    const gameParams = useParams<keyof GameParams>()

    const mapService: IMapService = useContext(MapServiceContext)
    const [snakeService, setSnakeService] = useState<ISnakeService>()

    useEffect(() => {
        if (!snakeService) {
            mapService.load(gameParams.map!)
                .then(map => setSnakeService(new SnakeService(map, parseInt(gameParams.speed!))))
        }
    })

    return <div id="game-container">
        {snakeService && <SnakeServiceContext.Provider value={snakeService}>
            <Game/>
        </SnakeServiceContext.Provider>}
    </div>
}

export default GameContainer
