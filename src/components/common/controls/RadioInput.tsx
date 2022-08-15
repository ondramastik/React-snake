import React, {FC} from 'react';
import {RadioGroup} from '@headlessui/react'

interface RadioInputProps {
    options: Object
    value: string,
    onChange: (value: string) => void
}

const RadioInput: FC<RadioInputProps> = ({options, value, onChange, ...rest}) =>
    <RadioGroup value={value} onChange={onChange} className="flex justify-between w-full">
        {Object.entries(options).map(([option, index]) => <RadioGroup.Option value={index} className="text-slate-900">
            {({checked}) => (<div className="flex space-x-2 items-center">
                    <p className="text-sm">{option}</p>
                    <div
                        className={`w-[1em] h-[1em] border-2 rounded-[1em] relative ${checked ? "border-slate-500" : "border-slate-900"}`}>
                        {checked && <div className="w-full h-full bg-slate-900 absolute top-0 left-0 rounded-[1em]"/>}
                    </div>
                </div>
            )}
        </RadioGroup.Option>)}
    </RadioGroup>


export default RadioInput;
