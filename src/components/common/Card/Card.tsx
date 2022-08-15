import React, {ComponentPropsWithoutRef, FC} from 'react';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode
}

const Card: FC<CardProps> = ({children, className, ...rest}) =>
    <div className={`${className} min-w-[350px] max-w-full p-2 bg-slate-400 border-slate-900 border-2 rounded-lg shadow-xl`} {...rest}>
        {children}
    </div>

export default Card;
