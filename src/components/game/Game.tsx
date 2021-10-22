import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import GameView from "../../domain/GameView";
import ISnakeService from "../../domain/service/SnakeService";
import {SnakeServiceContext} from "../../context/SnakeServiceContext";
import {Direction} from "../../domain/Direction";
import GamePresenter from "./GamePresenter";
import GameControls from "./game-controls/GameControls";
import GameMap from "../../domain/GameMap";

interface Props {
  map: GameMap
  speed?: number
}

const Game: FC<Props> = ({map, speed}) => {
  const [gameView, setGameView] = useState<GameView | undefined>()

  const [running, setRunning] = useState<boolean>(true)
  const [tick, setTick] = useState<number>(0)
  const [direction, setDirection] = useState<Direction>(map.startDirection)

  const snakeService: ISnakeService = useContext(SnakeServiceContext)

  const restart = useCallback(() => {
    snakeService.reset(map)
      .then(gameView => setGameView(gameView))

    setTick(0)
    setRunning(true)
    setDirection(map.startDirection)
  }, [map, snakeService])

  useEffect(() => {
    if (running) {
      setTimeout(() => setTick(tick + 1), 500 / (speed || map.startSpeed))

      snakeService
        .tick(direction, map)
        .then(gameView => setGameView(gameView))
        .catch(() => {
          setRunning(false)
        })
    }
  }, [speed, running, snakeService, tick, map])

  useEffect(() => {
    restart()
  }, [map, restart])


  return <div id="game">
    {gameView && <GamePresenter map={map}
                                gameView={gameView}
                                speed={speed || map.startSpeed}/>}
    <GameControls restart={() => restart()}
                  onDirectionChange={direction => setDirection(direction)}
                  lastDirection={direction}
                  disabled={running}/>
  </div>
}

export default Game
