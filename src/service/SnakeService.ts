import ISnakeService from "../domain/service/SnakeService";
import GameView from "../domain/GameView";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";
import GameMap from "../domain/GameMap";

export default class SnakeService implements ISnakeService {

  private map: GameMap

  private foodLocation: Coordinates

  private snakeTiles: Coordinates[]

  private lastDirection: Direction

  constructor(map: GameMap, lastDirection: Direction) {
    this.map = map
    this.foodLocation = SnakeService.generateFoodLocation(map.tiles)
    this.snakeTiles = [{...map.startLocation}]
    this.lastDirection = lastDirection
  }

  tick(direction?: Direction): Promise<GameView> {
    return new Promise<GameView>((resolve, reject) => {
      try {
        if(direction !== undefined) {
          resolve(this.handleTick(direction))
        } else {
          resolve(this.getGameView())
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  reset(): Promise<GameView> {
    this.snakeTiles = [{...this.map.startLocation}]
    this.foodLocation = SnakeService.generateFoodLocation(this.map.tiles)

    return Promise.resolve(this.getGameView())
  }

  private handleTick(direction: Direction): GameView {
    const currentHeadPos = this.snakeTiles[this.snakeTiles.length - 1]
    const newPos = {...currentHeadPos}

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

    this.snakeTiles.push(newPos)

    if (this.foodLocation.X === newPos.X && this.foodLocation.Y === newPos.Y) {
      this.foodLocation = SnakeService.generateFoodLocation(this.map.tiles)
    } else this.snakeTiles.shift()


    return this.getGameView()
  }

  private getGameView(): GameView {
    return {
      tiles: this.map.tiles,
      snakeTiles: this.snakeTiles,
      foodLocation: this.foodLocation
    }
  }

  private validate(newPos: Coordinates): void {
    if (!this.map.tiles[newPos.X][newPos.Y]) {
      throw Error("Player out of field")
    }
    if (![TileType.Floor, TileType.Food].includes(this.map.tiles[newPos.X][newPos.Y])) {
      throw Error("Player crashed")
    }
    if (this.snakeTiles.filter(snakeLoc => snakeLoc.X === newPos.X && snakeLoc.Y === newPos.Y).length > 0) {
      throw Error("The player ate himself")
    }
  }

  private static generateFoodLocation(tiles: TileType[][]): Coordinates {
    let x: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles.length)
      console.log(tiles[tmp])
      if (tiles[tmp] !== undefined && tiles[tmp].includes(TileType.Floor)) {
        x = tmp
        break;
      }
    }

    let y: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles[x].length)
      console.log(tiles[x][tmp])
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


}