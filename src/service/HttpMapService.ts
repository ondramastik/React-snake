import IMapService from "../domain/service/IMapService";
import {TileType} from "../domain/TileType";
import axios from 'axios';

export default class HttpMapService implements IMapService {

    list(): Promise<string[]> {
        return axios.get('/React-snake/resources/maps/maplist.json').then(response => response.data)
    }

    load(name: string): Promise<TileType[][]> {
        return axios.get(`/React-snake/resources/maps/${name}.json`).then(response => response.data)
    }

}