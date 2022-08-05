import React, {FC} from 'react';
import {Link} from "react-router-dom";

const Menu: FC = () =>
    <ul>
        <li>
            <Link to="game">Play</Link>
        </li>
        <li>
            <Link to="map-editor">Map editor</Link>
        </li>
    </ul>

export default Menu;
