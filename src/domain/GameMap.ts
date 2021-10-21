import {TileType} from "./TileType";
import Coordinates from "./Coordinates";

export default interface GameMap {
  tiles: TileType[][]
  startLocation: Coordinates
}