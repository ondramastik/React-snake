import ISnakeService from "../domain/service/SnakeService";
import GameView from "../domain/GameView";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";
import GameMap from "../domain/GameMap";

export default class SnakeService implements ISnakeService {

  private foodLocation: Coordinates | undefined

  private snakeTiles: Coordinates[] = []

  private errors: Error[] = []

  private initialized: boolean = false

  tick(direction: Direction, map: GameMap): Promise<GameView> {
    if (!this.initialized) {
      this.reset(map)
        .then(() => this.initialized = true)
    }

    return new Promise<GameView>((resolve, reject) => {
      const gameView = this.handleTick(direction, map)

      if (gameView.errors?.length < 1) {
        resolve(gameView)
      } else reject(gameView.errors)
    })
  }

  reset(map: GameMap): Promise<GameView> {
    this.snakeTiles = [{...map.startLocation}]
    this.foodLocation = SnakeService.generateFoodLocation(map.tiles, this.snakeTiles)
    this.errors = []

    return Promise.resolve(this.getGameView())
  }

  private handleTick(direction: Direction, map: GameMap): GameView {
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

    this.errors.push(...this.validate(newPos, map))

    if (this.errors.length < 1 && this.foodLocation) {
      this.snakeTiles.push(newPos)

      if (this.foodLocation.X === newPos.X && this.foodLocation.Y === newPos.Y) {
        this.foodLocation = SnakeService.generateFoodLocation(map.tiles, this.snakeTiles)
      } else this.snakeTiles.shift()
    }

    return this.getGameView()
  }

  private getGameView(): GameView {
    return {
      snakeTiles: this.snakeTiles,
      foodLocation: this.foodLocation!,
      errors: this.errors
    }
  }

  private validate(newPos: Coordinates, map: GameMap): Error[] {
    const errors = []

    if (map.tiles[newPos.X][newPos.Y] === undefined) {
      errors.push(Error("Player out of field"))
    }
    if (![TileType.Floor, TileType.Food, TileType.Snake].includes(map.tiles[newPos.X][newPos.Y])) {
      errors.push(Error("Player crashed"))
    }
    if (this.snakeTiles.filter(snakeLoc => snakeLoc.X === newPos.X && snakeLoc.Y === newPos.Y).length > 0) {
      errors.push(Error("The player ate himself"))
    }

    return errors
  }

  private static generateFoodLocation(tiles: TileType[][], snakeTiles: Coordinates[]): Coordinates {
    let x: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles.length)
      if (tiles[tmp] !== undefined && tiles[tmp].includes(TileType.Floor)) {
        x = tmp
        break
      }
    }

    let y: number = -1

    while (true) {
      let tmp = SnakeService.randomIndex(tiles[x].length)
      if (tiles[x][tmp] !== undefined && tiles[x][tmp] === TileType.Floor) {
        y = tmp
        break
      }
    }

    if(snakeTiles.filter(pos => pos.X === x && pos.Y === y).length < 1) {
      return {
        X: x,
        Y: y
      }
    } else return SnakeService.generateFoodLocation(tiles, snakeTiles)
  }

  private static randomIndex(max: number): number {
    return Math.floor((Math.random() * max))
  }


}