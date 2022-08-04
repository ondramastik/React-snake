import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameView from "../../domain/GameView";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import {Direction} from "../../domain/Direction";
import IMapService from "../../domain/service/IMapService";
import {MapServiceContext} from "../../context/MapServiceContext";

interface Props {
    gameSpeed: number
}

const Game: FC<Props> = ({gameSpeed}) => {
    const [gameView, setGameView] = useState<GameView | undefined>()

    const [running, setRunning] = useState(false)

    const [error, setError] = useState(false)
    const [errorCause, setErrorCause] = useState()

    const [tick, setTick] = useState(0)
    const [currentDirection, setCurrentDirection] = useState<Direction>()
    const [nextDirection, setNextDirection] = useState<Direction>()

    const snakeService: ISnakeService = useContext(SnakeServiceContext)
    const mapService: IMapService = useContext(MapServiceContext)

    const restart = () => {
        snakeService.reset()
            .then(gameView => setGameView(gameView))

        setTick(0)
        setError(false)
        setErrorCause(undefined)
        setRunning(true)
        setNextDirection(undefined)
        setCurrentDirection(undefined)
    }

    const isValidDirection = useCallback((prevDirection?: Direction, newDirection?: Direction) => {
        switch (newDirection) {
            case Direction.Left:
                if (prevDirection === Direction.Right)
                    return false
                break
            case Direction.Top:
                if (prevDirection === Direction.Down)
                    return false
                break
            case Direction.Right:
                if (prevDirection === Direction.Left)
                    return false
                break
            case Direction.Down:
                if (prevDirection === Direction.Top)
                    return false
                break
        }
        return true
    }, [])

    useEffect(() => {
        if (!error && !running) {
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
                }

                if (newDirection !== undefined) {
                    setNextDirection(newDirection)
                }
            })

            setRunning(true)
        }
    }, [currentDirection, error, isValidDirection, running])

    useEffect(() => {
        if (running) {
            setTimeout(() => setTick(tick + 1), gameSpeed)

            snakeService
                .tick(nextDirection)
                .then(gameView => setGameView(gameView))
                .catch(reason => {
                    setErrorCause(reason.message)
                    setRunning(false)
                    setError(true)
                })

            setCurrentDirection(nextDirection)
        }
    }, [gameSpeed, running, snakeService, tick])

    useEffect(() => {
        if (!isValidDirection(currentDirection, nextDirection)) {
            setNextDirection(currentDirection)
        }
    }, [currentDirection, isValidDirection, nextDirection])


    return <div id="game">
        <h1>Směr: {currentDirection}</h1>
        <h1>Tick: {tick}</h1>
        {errorCause && <h1>Error: {errorCause}</h1>}
        {gameView && <GameFieldPresenter gameField={gameView}/>}
        <button onClick={() => restart()} disabled={running}>Restart</button>
        <button onClick={() => mapService.list().then(maps => console.log(maps))}>Get maps</button>
    </div>
}

export default Game
