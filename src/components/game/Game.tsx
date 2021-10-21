import React, {FC, useContext, useEffect, useState} from 'react';
import GameView from "../../domain/GameView";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import {Direction} from "../../domain/Direction";
import GamePresenter from "./GamePresenter";
import GameControls from "./game-controls/GameControls";

interface Props {
  gameSpeed: number
}

const Game: FC<Props> = ({gameSpeed}) => {
  const [gameView, setGameView] = useState<GameView | undefined>()

  const [running, setRunning] = useState(true)

  const [tick, setTick] = useState(0)
  const [direction, setDirection] = useState<Direction>()

  const snakeService: ISnakeService = useContext(SnakeServiceContext)

  const restart = () => {
    snakeService.reset()
      .then(gameView => setGameView(gameView))

    setTick(0)
    setRunning(true)
    setDirection(undefined)
  }

  useEffect(() => {
    if (running) {
      setTimeout(() => setTick(tick + 1), gameSpeed)

      snakeService
        .tick(direction)
        .then(gameView => setGameView(gameView))
        .catch(() => {
          setRunning(false)
        })
    }
  }, [gameSpeed, running, snakeService, tick])


  return <div id="game">
    <GameControls restart={() => restart()}
                  onDirectionChange={direction => setDirection(direction)}
                  lastDirection={direction}
                  disabled={running}/>
    {gameView && <GamePresenter gameView={gameView}/>}
  </div>
}

export default Game
