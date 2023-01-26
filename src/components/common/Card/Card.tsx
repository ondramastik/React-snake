import React, {ComponentPropsWithoutRef, FC} from 'react';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode
    heading?: React.ReactNode
}

const Card: FC<CardProps> = ({children, heading, className, ...rest}) =>
    <div
        className={`${className} min-w-[350px] max-w-full p-2 bg-slate-400 border-slate-900 border-2 rounded-lg shadow-xl`} {...rest}>
        {heading && <p className="flex justify-center text-2xl font-bold border-b border-slate-900 pb-2">{heading}</p>}
        {children}
    </div>

export default Card;
