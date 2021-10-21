import React, {FC} from 'react';
import GameView from "../../../domain/GameView";
import Coordinates from "../../../domain/Coordinates";
import {TileType} from "../../../domain/TileType";
import styled from "styled-components";

interface Props {
  gameView: GameView
}

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

const resolveTile = (gameField: GameView, pos: Coordinates) => {
  if (gameField.snakeTiles.filter(location => location.X === pos.X && location.Y === pos.Y).length > 0) {
    return TileType.Snake
  } else if (gameField.foodLocation.X === pos.X && gameField.foodLocation.Y === pos.Y) {
    return TileType.Food
  }

  return gameField.tiles[pos.X][pos.Y]
}

const GameFieldPresenter: FC<Props> = ({gameView}) => {
  const getTile = (gameView: GameView, pos: Coordinates) => {
    const resolvedTile = resolveTile(gameView, pos)

    switch (resolvedTile) {
      case TileType.Wall:
        return <WallTile/>
      case TileType.Snake:
        return <SnakeTile/>
      case TileType.Food:
        return <FoodTile/>
    }

    return <FloorTile/>
  }

  return <Container id="game-field-presenter">
    {gameView.tiles.map(
      (row, x) => <div>
        {row.map((tile, y) => getTile(gameView, {X: x, Y: y}))}
      </div>)}
  </Container>
}

export default GameFieldPresenter
