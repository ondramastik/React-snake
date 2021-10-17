import ISnakeService from "../domain/service/SnakeService";
import GameField from "../domain/GameField";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";

export default class SnakeService implements ISnakeService {

  gameField: GameField

  headPosX: number

  headPosY: number

  tailPosX: number

  tailPosY: number

  lastDirection: Direction


  constructor(gameField: GameField, playerPosX: number, playerPosY: number, lastDirection: Direction) {
    this.gameField = gameField;
    this.headPosX = playerPosX;
    this.headPosY = playerPosY;
    this.tailPosX = this.headPosX
    this.tailPosY = this.headPosY
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
    let newPosX = this.headPosX
    let newPosY = this.headPosY

    switch (direction) {
      case Direction.Top:
        newPosX -= 1
        break;
      case Direction.Down:
        newPosX += 1
        break;
      case Direction.Left:
        newPosY -= 1
        break;
      case Direction.Right:
        newPosY += 1
        break;
    }

    this.headPosX = newPosX
    this.headPosY = newPosY

    this.gameField.tiles[newPosX][newPosY] = TileType.Snake

    return this.gameField
  }


}