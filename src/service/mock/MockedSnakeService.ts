import ISnakeService from "../../domain/service/SnakeService";
import GameField from "../../domain/GameField";
import {Direction} from "../../domain/Direction";


export default class MockedSnakeService implements ISnakeService {

  tick(direction: Direction): Promise<GameField> {
    return Promise.resolve({tiles: [], snakeTiles: [], foodLocation: {X: 1, Y: 1}},)
  }

}