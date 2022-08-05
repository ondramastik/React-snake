import Coordinates from "./Coordinates";

export default interface GameMeta {
    snakeTiles: Coordinates[]
    foodLocation: Coordinates
    nextTickIn: number
}