import {TileType} from "../TileType";

export default interface IMapService {

    list(): Promise<string[]>

    load(name: string): Promise<TileType[][]>

}