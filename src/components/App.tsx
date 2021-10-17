import React, {useState} from 'react';
import {TileType as TT} from "../domain/TileType";
import SnakeService from "../service/SnakeService";
import {Direction} from "../domain/Direction";
import Game from "./game/Game";
import {SnakeServiceContext} from "../context/SnakeServiceContext";

function App() {
  const [snakeService] = useState(new SnakeService({
    tiles: [
      [TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Empty, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall],
      [TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Wall, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Floor, TT.Floor, TT.Floor, TT.Wall, TT.Empty, TT.Wall, TT.Floor, TT.Floor, TT.Wall],
      [TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall, TT.Wall],
    ]
  }, 0, 0, Direction.Right))

  return (
    <div className="App">
      <SnakeServiceContext.Provider value={snakeService}>
        <Game gameSpeed={1000}/>
      </SnakeServiceContext.Provider>
    </div>
  );
}

export default App;
