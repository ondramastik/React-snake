import React, {useState} from 'react';
import {TileType as TT} from "../domain/TileType";
import SnakeService from "../service/SnakeService";
import {Direction} from "../domain/Direction";
import Game from "./game/Game";
import {SnakeServiceContext} from "../context/SnakeServiceContext";

function App() {
  const [snakeService] = useState(new SnakeService([
    [TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall,],
    [TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall,],
  ], 1, 1, Direction.Down))

  return (
    <div className="App">
      <SnakeServiceContext.Provider value={snakeService}>
        <Game gameSpeed={200}/>
      </SnakeServiceContext.Provider>
    </div>
  );
}

export default App;
