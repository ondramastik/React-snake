import ISnakeService from "../../domain/service/SnakeService";
import GameView from "../../domain/GameView";
import {Direction} from "../../domain/Direction";


export default class MockedSnakeService implements ISnakeService {

  tick(direction?: Direction): Promise<GameView> {
    return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, errors: []},)
  }

  reset(): Promise<GameView> {
    return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}, errors: []},)
  }

}