import React, {FC, useState} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import HttpMapService from "../../../service/HttpMapService";
import Menu from "../../menu/Menu";
import {MapServiceContext} from "../../../context/MapServiceContext";
import GameSettings from "../game-settings/GameSettings";
import GameContainer from "../GameContainer";

const GameRouter: FC = () => {
    const [mapService] = useState(new HttpMapService())

    return (
        <HashRouter>
            <MapServiceContext.Provider value={mapService}>
                <Routes>
                    <Route path="/React-snake/">
                        <Route index element={<Menu/>}/>
                        <Route path="game">
                            <Route index element={<GameSettings/>}/>
                            <Route path="play/:map/:speed" element={<GameContainer/>}/>
                        </Route>
                        <Route path="map-editor" element={"<MapEditor/>"}/>
                    </Route>
                </Routes>
            </MapServiceContext.Provider>
        </HashRouter>
    );
}

export default GameRouter;
