import {TileType} from "./TileType";
import Coordinates from "./Coordinates";
import {Direction} from "./Direction";

export default interface GameMap {
  tiles: TileType[][]
  startLocation: Coordinates
  startDirection: Direction
  startSpeed: number
}