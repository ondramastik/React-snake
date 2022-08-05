import ISnakeService from "../../domain/service/SnakeService";
import GameMeta from "../../domain/GameMeta";
import {Direction} from "../../domain/Direction";
import GameMap from "../../domain/GameMap";


export default class MockedSnakeService implements ISnakeService {

    getMap(): GameMap {
        return {} as GameMap;
    }

    tick(direction?: Direction): Promise<GameMeta> {
        return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, nextTickIn: 50})
    }

    reset(): Promise<GameMeta> {
        return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, nextTickIn: 50})
    }

    getErrorCause(): string | undefined {
        return undefined;
    }

    getScore(): number {
        return 0;
    }

    getTickNumber(): number {
        return 0;
    }

    hasError(): boolean {
        return false;
    }

}