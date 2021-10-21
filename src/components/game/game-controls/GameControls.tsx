import React, {FC, useEffect, useState} from 'react';
import {Direction} from "../../../domain/Direction";

interface Props {
  restart: () => void
  onDirectionChange: (direction: Direction) => void
  lastDirection?: Direction
  disabled?: boolean
}

const GameControls: FC<Props> = ({restart, onDirectionChange, lastDirection, disabled}) => {
  const [direction, setDirection] = useState<Direction>()

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
      }

      if (newDirection !== undefined) {
        setDirection(newDirection)
      }
    })
  }, [setDirection])

  useEffect(() => {
    const isValidDirection = (prevDirection?: Direction, newDirection?: Direction) => {
      switch (newDirection) {
        case Direction.Left:
          if(prevDirection === Direction.Right)
            return false
          break
        case Direction.Top:
          if(prevDirection === Direction.Down)
            return false
          break
        case Direction.Right:
          if(prevDirection === Direction.Left)
            return false
          break
        case Direction.Down:
          if(prevDirection === Direction.Top)
            return false
          break
      }
      return true
    }

    if(direction !== undefined && isValidDirection(lastDirection, direction)) {
      onDirectionChange(direction)
    }
  }, [direction, lastDirection, onDirectionChange])

  return <div id="game-controls">
    <button onClick={() => restart()} disabled={disabled}>Restart</button>
  </div>
}

export default GameControls
