import React, {ComponentPropsWithoutRef, FC} from 'react';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
    label: string,
    options: string[],
}

const Select: FC<SelectProps> = ({id, label, options, className, ...rest}) => <>
    <label htmlFor={id} hidden>{label}</label>
    <select id={id} {...rest}
            className={`${className} h-8 rounded-sm shadow-md border-slate-900 border bg-white text-slate-900`}>
        {options.map(map => <option key={map} value={map} className="bg-white">{map}</option>)}
    </select>
</>

export default Select;
