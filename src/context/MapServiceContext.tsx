import React from "react"
import IMapService from "../domain/service/IMapService";

export const MapServiceContext = React.createContext<IMapService>({} as IMapService);