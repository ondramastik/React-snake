import React, {FC} from 'react';
import GameView from "../../../domain/GameView";
import Coordinates from "../../../domain/Coordinates";
import {TileType} from "../../../domain/TileType";
import styled from "styled-components";
import GameMap from "../../../domain/GameMap";


const Container = styled.div`
  width: 100%;
  line-height: 7px;
`
const Tile = styled.div`
  width: 14px;
  height: 14px;
  display: inline-block;
`

const FloorTile = styled(Tile)`
  background-color: lightgray;
`

const WallTile = styled(Tile)`
  background-color: #BC4A3C;
`

const SnakeTile = styled(Tile)`
  background-color: black;
`

const FoodTile = styled(Tile)`
  background-color: #4dbc3c;
`

interface Props {
  map: GameMap
  gameView: GameView
}

const resolveTile = (map: GameMap, gameField: GameView, pos: Coordinates) => {
  if (gameField.snakeTiles.filter(location => location.X === pos.X && location.Y === pos.Y).length > 0) {
    return TileType.Snake
  } else if (gameField.foodLocation.X === pos.X && gameField.foodLocation.Y === pos.Y) {
    return TileType.Food
  }

  return map.tiles[pos.X][pos.Y]
}

const getTile = (map: GameMap, gameView: GameView, pos: Coordinates, key: string) => {
  const resolvedTile = resolveTile(map, gameView, pos)

  switch (resolvedTile) {
    case TileType.Wall:
      return <WallTile key={key}/>
    case TileType.Snake:
      return <SnakeTile key={key}/>
    case TileType.Food:
      return <FoodTile key={key}/>
  }

  return <FloorTile key={key}/>
}

const GameFieldPresenter: FC<Props> = ({map, gameView}) =>
  <Container id="game-field-presenter">
    {map.tiles.map(
      (row, x) => <div key={x}>
        {row.map((tile, y) => getTile(map, gameView, {X: x, Y: y}, `${x}-${y}`))}
      </div>)}
  </Container>


export default GameFieldPresenter
