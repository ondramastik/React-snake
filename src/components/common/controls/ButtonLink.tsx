import React, {FC, ReactNode} from 'react';
import {Link, LinkProps} from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
    children: ReactNode,
}

const ButtonLink: FC<ButtonLinkProps> = ({id, children, className, ...rest}) =>
    <Link {...rest}
          className={`${className} py-1 px-4 rounded-md shadow-md border-slate-900 border bg-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-700`}>
        {children}
    </Link>


export default ButtonLink;
