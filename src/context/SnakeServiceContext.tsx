import React from "react"
import ISnakeService from "../domain/service/SnakeService";
import MockedSnakeService from "../service/mock/MockedSnakeService";

export const SnakeServiceContext = React.createContext<ISnakeService>(new MockedSnakeService())