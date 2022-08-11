import React, {FC, useState} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import HttpMapService from "../../../service/HttpMapService";
import Menu from "../../menu/Menu";
import {MapServiceContext} from "../../../context/MapServiceContext";
import GameSettings from "../game-settings/GameSettings";
import GameContainer from "../GameContainer";
import MapEditor from "../../map-editor/MapEditor";

const GameRouter: FC = () => {
    const [mapService] = useState(new HttpMapService())

    return (
        <MapServiceContext.Provider value={mapService}>
            <HashRouter basename="/">
                <Routes>
                    <Route path="/">
                        <Route index element={<Menu/>}/>
                        <Route path="game">
                            <Route index element={<GameSettings/>}/>
                            <Route path="play/:map/:speed" element={<GameContainer/>}/>
                        </Route>
                        <Route path="map-editor" element={<MapEditor/>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </MapServiceContext.Provider>
    );
}

export default GameRouter;
