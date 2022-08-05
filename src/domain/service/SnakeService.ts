import GameMeta from "../GameMeta";
import {Direction} from "../Direction";
import GameMap from "../GameMap";

export default interface ISnakeService {

    getMap(): GameMap

    tick(direction?: Direction): Promise<GameMeta>

    reset(): Promise<GameMeta>

    getScore(): number

    getTickNumber(): number

    hasError(): boolean

    getErrorCause(): string | undefined

}