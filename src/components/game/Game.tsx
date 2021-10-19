import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameField from "../../domain/GameField";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import GameFieldPresenter from "./game-field/GameFieldPresenter";
import {Direction} from "../../domain/Direction";

interface Props {
  gameSpeed: number
}

const Game: FC<Props> = ({gameSpeed}) => {
  const [gameField, setGameField] = useState<GameField | undefined>()
  const [running, setRunning] = useState(false)
  const [error, setError] = useState(false)
  const [tick, setTick] = useState(0)
  const [direction, setDirection] = useState(Direction.Down)

  const snakeService: ISnakeService = useContext(SnakeServiceContext)

  useEffect(() => {
    if (!error && !running) {
      document.addEventListener('keydown', function (e) {
        switch (e.code) {
          case "ArrowLeft":
            setDirection(Direction.Left)
            break;
          case "ArrowUp":
            setDirection(Direction.Top)
            break;
          case "ArrowRight":
            setDirection(Direction.Right)
            break;
          case "ArrowDown":
            setDirection(Direction.Down)
            break;
        }
      })
      setRunning(true)
    }
  }, [error, running, direction])

  useEffect(() => {
    if(running) {
      setTimeout(() => setTick(tick + 1), gameSpeed)

      snakeService
        .tick(direction)
        .then(gameField => setGameField(gameField))
        .catch(reason => {
          setRunning(false)
          setError(true)
        })
    }
  }, [direction, gameSpeed, running, snakeService, tick])


  return <div id="game">
    <h1>Směr: {direction}</h1>
    <h1>Tick: {tick}</h1>
    {gameField && <GameFieldPresenter gameField={gameField}/>}
  </div>
}

export default Game
