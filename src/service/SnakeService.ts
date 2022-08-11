import ISnakeService from "../domain/service/SnakeService";
import GameMeta from "../domain/GameMeta";
import {Direction} from "../domain/Direction";
import {TileType} from "../domain/TileType";
import Coordinates from "../domain/Coordinates";
import GameMap from "../domain/GameMap";

export default class SnakeService implements ISnakeService {

    private readonly _map: GameMap

    private readonly speed: number

    private foodLocation: Coordinates

    private snakeTiles: Coordinates[]

    private score: number = 0

    private tickNumber: number = 0

    private error: boolean = false

    private errorCause: string | undefined

    private prevDirection: Direction

    private deathAudio = new Audio('/React-snake/resources/audio/death.mp3');

    constructor(map: GameMap, speed: number = 5) {
        this._map = map
        this.prevDirection = map.startDirection
        this.foodLocation = SnakeService.generateFoodLocation(map.tiles)
        this.snakeTiles = [{...map.startLocation}]
        this.speed = speed
        this.deathAudio.load()
    }

    getMap(): GameMap {
        return this._map;
    }

    tick(direction?: Direction): Promise<GameMeta> {
        return new Promise<GameMeta>((resolve, reject) => {
            try {
                const isValidDirection = SnakeService.isValidDirection(this.prevDirection, direction)
                const newDirection = direction !== undefined && isValidDirection ? direction : this.prevDirection
                const gameView = this.handleTick(newDirection)
                this.prevDirection = newDirection
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
        this.prevDirection = this._map.startDirection
        this.foodLocation = SnakeService.generateFoodLocation(this._map.tiles)
        this.score = 0
        this.tickNumber = 0
        this.error = false
        this.errorCause = undefined
        this.deathAudio.pause()

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
        console.log(direction)
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
            const eatingAudio = new Audio('/React-snake/resources/audio/eating.wav');
            eatingAudio.play()
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
            if (tiles[tmp] !== undefined && tiles[tmp].includes(TileType.Floor)) {
                x = tmp
                break;
            }
        }

        let y: number = -1

        while (true) {
            let tmp = SnakeService.randomIndex(tiles[x].length)
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

    private static isValidDirection(prevDirection?: Direction, newDirection?: Direction): boolean {
        switch (newDirection) {
            case Direction.Left:
                if (prevDirection === Direction.Right)
                    return false
                break
            case Direction.Top:
                if (prevDirection === Direction.Down)
                    return false
                break
            case Direction.Right:
                if (prevDirection === Direction.Left)
                    return false
                break
            case Direction.Down:
                if (prevDirection === Direction.Top)
                    return false
                break
        }
        return true
    }


}