import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameMeta from "../../domain/GameMeta";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import {Direction} from "../../domain/Direction";
import Button from "../common/controls/Button";
import CardWithNavigation from "../common/Card/CardWithNavigation";


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
        let pageWidth = window.innerWidth || document.body.clientWidth;
        let threshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
        const gestureZone = document

        gestureZone.addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gestureZone.addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture(event);
        }, false);

        function handleGesture(_: TouchEvent) {
            let x = touchendX - touchstartX;
            let y = touchendY - touchstartY;
            let xy = Math.abs(x / y);
            let yx = Math.abs(y / x);
            if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
                if (yx <= limit) {
                    if (x < 0) {
                        setNextDirection(Direction.Left)
                    } else {
                        setNextDirection(Direction.Right)
                    }
                }
                if (xy <= limit) {
                    if (y < 0) {
                        setNextDirection(Direction.Top)
                    } else {
                        setNextDirection(Direction.Down)
                    }
                }
            } else {
                console.log("tap");
            }
        }

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
                .catch(() => {
                    setRunning(false)
                })
                .finally(() => setTickInProgress(false))
        }
    }, [gameMeta])


    return <div id="game" className="flex justify-evenly items-center mx-auto">
        <CardWithNavigation className="space-y-2" heading={snakeService.getMap().name}>
            <div className="flex justify-between items-center">
                <p className="text-slate-900 font-bold text-lg">Score: {snakeService.getScore()}</p>
                {snakeService.hasError() && <p className="text-lg text-red-700">{snakeService.getErrorCause()}</p>}
            </div>
            <div className="flex justify-end space-x-2">
                <Button onClick={() => restart()} disabled={running}>Restart (space)</Button>
            </div>
        </CardWithNavigation>
        <div className="flex-none w-[75vh]">
            {gameMeta && <GameFieldPresenter gameMap={snakeService.getMap()} gameMeta={gameMeta}/>}
        </div>
    </div>
}

export default Game
