import React from 'react';
import SnakeService from "../service/SnakeService";
import {SnakeServiceContext} from "../context/SnakeServiceContext";
import GameSettingControls from "./game/game-setting-controls/GameSettingControls";

function App() {
  return (
    <div className="App">
      <SnakeServiceContext.Provider value={new SnakeService()}>
        <GameSettingControls/>
      </SnakeServiceContext.Provider>
    </div>
  )
}

export default App;
