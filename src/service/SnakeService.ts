import ISnakeService from "../domain/service/SnakeService";
import GameMeta from "../domain/GameMeta";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";
import GameMap from "../domain/GameMap";

export default class SnakeService implements ISnakeService {

    private _map: GameMap

    private foodLocation: Coordinates

    private snakeTiles: Coordinates[]

    private score: number = 0

    private tickNumber: number = 0

    private error: boolean = false

    private errorCause: string | undefined

    private speed: number

    private eatingAudio = new Audio('/React-snake/resources/audio/eating.wav');
    private deathAudio = new Audio('/React-snake/resources/audio/death.mp3');

    constructor(map: GameMap, speed: number = 5) {
        this._map = map
        this.foodLocation = SnakeService.generateFoodLocation(map.tiles)
        this.snakeTiles = [{...map.startLocation}]
        this.speed = speed
    }

    getMap(): GameMap {
        return this._map;
    }

    tick(direction?: Direction): Promise<GameMeta> {
        return new Promise<GameMeta>((resolve, reject) => {
            try {
                const gameView = this.handleTick(direction !== undefined ? direction : this._map.startDirection)
                resolve(gameView)
            } catch (e) {
                this.error = true
                this.errorCause = (e as Error).message
                this.deathAudio.play()
                reject(e)
            }
        })
    }

    reset(): Promise<GameMeta> {
        this.snakeTiles = [{...this._map.startLocation}]
        this.foodLocation = SnakeService.generateFoodLocation(this._map.tiles)
        this.score = 0
        this.tickNumber = 0
        this.error = false
        this.errorCause = undefined

        return Promise.resolve(this.getGameMeta())
    }

    getErrorCause(): string | undefined {
        return this.errorCause;
    }

    getScore(): number {
        return this.score;
    }

    getTickNumber(): number {
        return this.tickNumber;
    }

    hasError(): boolean {
        return this.error;
    }


    private handleTick(direction: Direction): GameMeta {
        const currentHeadPos = this.snakeTiles[this.snakeTiles.length - 1]
        const newPos = {...currentHeadPos}

        switch (direction) {
            case Direction.Top:
                newPos.X -= 1
                break;
            case Direction.Down:
                newPos.X += 1
                break;
            case Direction.Left:
                newPos.Y -= 1
                break;
            case Direction.Right:
                newPos.Y += 1
                break;
        }

        this.validate(newPos)

        this.snakeTiles.push(newPos)

        if (this.foodLocation.X === newPos.X && this.foodLocation.Y === newPos.Y) {
            this.eatingAudio.play()
            this.foodLocation = SnakeService.generateFoodLocation(this._map.tiles)
            this.score += this.speed
        } else this.snakeTiles.shift()


        return this.getGameMeta()
    }

    private getGameMeta(): GameMeta {
        return {
            snakeTiles: this.snakeTiles,
            foodLocation: this.foodLocation,
            nextTickIn: (11 - this.speed) * 25
        }
    }

    private validate(newPos: Coordinates): void {
        if (!this._map.tiles[newPos.X][newPos.Y]) {
            throw Error("Player out of field")
        }
        if (![TileType.Floor, TileType.Food].includes(this._map.tiles[newPos.X][newPos.Y])) {
            throw Error("Player crashed")
        }
        if (this.snakeTiles.filter(snakeLoc => snakeLoc.X === newPos.X && snakeLoc.Y === newPos.Y).length > 0) {
            throw Error("The player ate himself")
        }
    }

    private static generateFoodLocation(tiles: TileType[][]): Coordinates {
        let x: number = -1

        while (true) {
            let tmp = SnakeService.randomIndex(tiles.length)
            console.log(tiles[tmp])
            if (tiles[tmp] !== undefined && tiles[tmp].includes(TileType.Floor)) {
                x = tmp
                break;
            }
        }

        let y: number = -1

        while (true) {
            let tmp = SnakeService.randomIndex(tiles[x].length)
            console.log(tiles[x][tmp])
            if (tiles[x][tmp] !== undefined && tiles[x][tmp] === TileType.Floor) {
                y = tmp
                break;
            }
        }

        return {
            X: x,
            Y: y
        }
    }

    private static randomIndex(max: number): number {
        return Math.floor((Math.random() * max))
    }


}