import React, {FC, useEffect, useState} from 'react';
import GameMap from "../../../domain/GameMap";
import Game from "../Game";
import GameMapConstants from "../../../constants/GameMapConstants";


const GameSettingControls: FC = () => {
  const [map, setMap] = useState<GameMap>()
  const [gameSpeed, setGameSpeed] = useState<number>(5)


  const onMapSelect = (name: string) => {
    const availableMaps = GameMapConstants.availableMaps.filter(tmp => tmp.name === name)
    if (availableMaps && availableMaps.length === 1) {
      fetch(availableMaps.pop()!.path)
        .then(res => res.json())
        .then(data => setMap(data))
    }
  }

  useEffect(() => {
    if(map) {
      setGameSpeed(map.startSpeed)
    }
  }, [map])

  return <React.Fragment>
    {map && <Game map={map}
                  speed={gameSpeed}/>}
    <div id="game-setting-controls">
      <div>
        <button onClick={() => setGameSpeed(gameSpeed - 1)}>-</button>
        Speed
        <button onClick={() => setGameSpeed(gameSpeed + 1)}>+</button>
      </div>
      <div>
        Map
        <select onChange={e => onMapSelect(e.target.value)}>
          {GameMapConstants.availableMaps
            .map((tmp, index) =>
              <option key={index} value={tmp.name}>
                {tmp.name}
              </option>)}
        </select>
      </div>
    </div>
  </React.Fragment>
}

export default GameSettingControls
