import React, {FC} from 'react';
import Card, {CardProps} from "./Card";
import Button from "../controls/Button";
import {useNavigate} from "react-router-dom";

interface Props extends CardProps {
    children?: React.ReactNode
}

const CardWithNavigation: FC<Props> = ({children, ...rest}) => {
    const navigate = useNavigate();

    function handleBackClick() {
        navigate(-1)
    }

    return <Card {...rest}>
        <div className="flex flex-col">
            <div className="pb-4 border-b border-slate-900">
                {children}
            </div>
            <Button className="mt-4" onClick={handleBackClick}>
                Back
            </Button>
        </div>
    </Card>
}

export default CardWithNavigation;
