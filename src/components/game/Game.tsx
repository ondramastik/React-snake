import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameMeta from "../../domain/GameMeta";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import {Direction} from "../../domain/Direction";
import Card from "../common/Card/Card";
import Button from "../common/controls/Button";
import {Link} from "react-router-dom";


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


    return <div id="game" className="space-y-4">
        <Card>
            <Link to="../../game">
                {"<--"} Go back
            </Link>
            <div className="flex justify-between items-center">
                <p className="text-slate-900 font-bold text-lg">Score: {snakeService.getScore()}</p>
                {snakeService.hasError() && <p className="text-lg text-red-700">{snakeService.getErrorCause()}</p>}
                <Button onClick={() => restart()} disabled={running}>Restart (space)</Button>
            </div>
        </Card>
        {gameMeta && <GameFieldPresenter gameMap={snakeService.getMap()} gameMeta={gameMeta}/>}
    </div>
}

export default Game
