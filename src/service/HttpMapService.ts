import IMapService from "../domain/service/IMapService";
import axios from 'axios';
import GameMap from "../domain/GameMap";

export default class HttpMapService implements IMapService {

    list(): Promise<string[]> {
        return axios.get('/React-snake/resources/maps/maplist.json').then(response => response.data)
    }

    load(name: string): Promise<GameMap> {
        return axios.get(`/React-snake/resources/maps/${name}.json`).then(response => response.data)
    }

}