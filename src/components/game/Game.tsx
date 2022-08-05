import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameMeta from "../../domain/GameMeta";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import {Direction} from "../../domain/Direction";


const Game: FC = () => {
    const snakeService: ISnakeService = useContext(SnakeServiceContext)

    const [gameMeta, setGameMeta] = useState<GameMeta | undefined>()

    const [running, setRunning] = useState(true)

    const [nextDirection, setNextDirection] = useState<Direction>()
    const [tickInProgress, setTickInProgress] = useState<boolean>(false)

    const restart = useCallback(() => {
        snakeService.reset()
            .then(gameView => setGameMeta(gameView))

        setRunning(true)
        setNextDirection(undefined)
        setTickInProgress(false)
    }, [snakeService])

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
                    console.log("Space")
                    restart()
                    break;
            }

            if (newDirection !== undefined) {
                setNextDirection(newDirection)
            }
        })
    }, [restart])

    useEffect(() => {
        if (running && !tickInProgress) {
            setTickInProgress(true)
            snakeService
                .tick(nextDirection)
                .then(meta => setTimeout(() => setGameMeta(meta), meta.nextTickIn))
                .then(() => setTickInProgress(false))
                .catch(() => {
                    setRunning(false)
                })
        }
    }, [gameMeta])


    return <div id="game">
        <h1>Score: {snakeService.getScore()}</h1>
        {snakeService.hasError() && <h1>Error: {snakeService.getErrorCause()}</h1>}
        {gameMeta && <GameFieldPresenter gameMap={snakeService.getMap()} gameMeta={gameMeta}/>}
        <button onClick={() => restart()} disabled={running}>Restart</button>
    </div>
}

export default Game
