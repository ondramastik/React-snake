import React, {FC} from 'react';
import {Link} from "react-router-dom";
import Card from "../common/Card/Card";

interface ListItemLinkProps {
    label: string
    link: string
}

const ListItemLink: FC<ListItemLinkProps> = ({label, link}) =>
    <li className="flex justify-center p-1 text-slate-900 font-bold hover:text-slate-600">
        <Link to={link}>{label}</Link>
    </li>

const Menu: FC = () =>
    <Card heading="Snake">
        <ul>
            <ListItemLink label="Play" link="game"/>
            <ListItemLink label="Map editor" link="map-editor"/>
        </ul>
    </Card>

export default Menu;
