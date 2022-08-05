import React, {ComponentPropsWithoutRef, FC, ReactNode} from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    children: ReactNode,
}

const Button: FC<ButtonProps> = ({id, disabled, children, className, ...rest}) =>
    <button id={id} {...rest}
            disabled={disabled}
            className={`${className} ${disabled ? "bg-slate-500 text-slate-100" : "bg-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-700"} py-1 px-4 rounded-md shadow-md border-slate-900 border`}>
        {children}
    </button>


export default Button;
