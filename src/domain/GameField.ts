import {TileType} from "./TileType";
import Coordinates from "./Coordinates";

export default interface GameField {
  tiles: TileType[][]
  snakeTiles?: Coordinates[]
}