import GameView from "../GameView";
import {Direction} from "../Direction";

export default interface ISnakeService {

  tick(direction?: Direction): Promise<GameView>

  reset(): Promise<GameView>

}