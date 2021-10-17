import GameField from "../GameField";
import {Direction} from "../Direction";

export default interface ISnakeService {

  tick(direction: Direction): Promise<GameField>

}