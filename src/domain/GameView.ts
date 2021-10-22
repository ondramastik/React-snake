import Coordinates from "./Coordinates";

export default interface GameView {
  snakeTiles: Coordinates[]
  foodLocation: Coordinates
  errors: Error[]
}