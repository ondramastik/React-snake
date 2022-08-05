import React, {ComponentPropsWithoutRef, FC} from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label: string,
}

const Input: FC<InputProps> = ({id, label, className, ...rest}) => <>
    <label htmlFor={id} hidden>{label}</label>
    <input id={id} {...rest}
           className={`${className} min-w-0 p-1 h-8 rounded-sm shadow-md border-slate-900 border bg-white text-slate-900`}/>
</>

export default Input;
