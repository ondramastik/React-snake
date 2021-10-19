import ISnakeService from "../domain/service/SnakeService";
import GameField from "../domain/GameField";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";

export default class SnakeService implements ISnakeService {

  gameField: GameField

  lastDirection: Direction

  constructor(tiles: TileType[][], playerPosX: number, playerPosY: number, lastDirection: Direction) {
    this.gameField = {
      tiles: tiles,
      snakeTiles: [{
        X: playerPosX,
        Y: playerPosY
      }],
      foodLocation: SnakeService.generateFoodLocation(tiles)
    }
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
    const currentHeadPos = this.gameField.snakeTiles[this.gameField.snakeTiles.length - 1]
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

    this.gameField.snakeTiles.push(newPos)

    if (this.gameField.foodLocation.X === newPos.X && this.gameField.foodLocation.Y === newPos.Y) {
      this.gameField.foodLocation = SnakeService.generateFoodLocation(this.gameField.tiles)
    } else this.gameField.snakeTiles.shift()


    return this.gameField
  }

  private static generateFoodLocation(tiles: TileType[][]): Coordinates {
    let x: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles.length)
      console.log(tmp)
      if (tiles[tmp] !== undefined) {
        x = tmp
        break;
      }
    }

    let y: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles[x].length)
      console.log(tmp)
      if (tiles[x][tmp] !== undefined && tiles[x][tmp] === TileType.Floor) {
        y = tmp
        break;
      }
    }

    return {
      X: x,
      Y: y
    }
  }

  private static randomIndex(max: number): number {
    return Math.floor((Math.random() * max))
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