import {TileType} from "./TileType";
import Coordinates from "./Coordinates";

export default interface GameView {
  tiles: TileType[][]
  snakeTiles: Coordinates[]
  foodLocation: Coordinates
  errors: Error[]
}