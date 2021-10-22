import GameView from "../GameView";
import {Direction} from "../Direction";
import GameMap from "../GameMap";

export default interface ISnakeService {

  tick(direction: Direction, map: GameMap): Promise<GameView>

  reset(map: GameMap): Promise<GameView>

}