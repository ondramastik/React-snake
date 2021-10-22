import ISnakeService from "../../domain/service/SnakeService";
import GameView from "../../domain/GameView";
import {Direction} from "../../domain/Direction";
import GameMap from "../../domain/GameMap";


export default class MockedSnakeService implements ISnakeService {

  tick(direction: Direction, map: GameMap): Promise<GameView> {
    return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, errors: []},)
  }

  reset(map: GameMap): Promise<GameView> {
    return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, errors: []},)
  }

}