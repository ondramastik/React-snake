import GameMap from "../GameMap";

export default interface IMapService {

    list(): Promise<string[]>

    load(name: string): Promise<GameMap>

}