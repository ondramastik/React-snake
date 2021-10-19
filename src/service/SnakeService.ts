import ISnakeService from "../domain/service/SnakeService";
import GameField from "../domain/GameField";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";

export default class SnakeService implements ISnakeService {

  gameField: GameField

  lastDirection: Direction

  snakeTiles: Coordinates[]


  constructor(gameField: GameField, playerPosX: number, playerPosY: number, lastDirection: Direction) {
    this.gameField = gameField;
    this.snakeTiles = [{
      X: playerPosX,
      Y: playerPosY
    }]
    this.lastDirection = lastDirection
  }

  tick(direction: Direction): Promise<GameField> {
    return new Promise<GameField>((resolve, reject) => {
      try {
        resolve(this.handleTick(direction))
      } catch (e) {
        reject(e)
      }
    })
  }

  private handleTick(direction: Direction): GameField {
    const currentHeadPos = this.snakeTiles[this.snakeTiles.length - 1]
    const newPos = {
      X: currentHeadPos.X,
      Y: currentHeadPos.Y
    }

    switch (direction) {
      case Direction.Top:
        newPos.X -= 1
        break;
      case Direction.Down:
        newPos.X += 1
        break;
      case Direction.Left:
        newPos.Y -= 1
        break;
      case Direction.Right:
        newPos.Y += 1
        break;
    }

    this.validate(newPos)
    console.log("next pos: %o", newPos)

    this.snakeTiles.push(newPos)
    console.log("pushed: %o", [...this.snakeTiles])
    this.snakeTiles.shift()
    console.log("shifted: %o", [...this.snakeTiles])

    return {
      tiles: this.gameField.tiles,
      snakeTiles: this.snakeTiles
    }
  }

  private validate(newPos: Coordinates): void {
    if (!this.gameField.tiles[newPos.X][newPos.Y]) {
      throw Error("Player out of field")
    }
    if (![TileType.Floor, TileType.Food].includes(this.gameField.tiles[newPos.X][newPos.Y])) {
      throw Error("Player crashed")
    }
  }


}