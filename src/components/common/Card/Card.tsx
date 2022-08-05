import React, {FC} from 'react';

interface Props {
    children?: React.ReactNode
}

const Card: FC<Props> = ({children}) =>
    <section>
        <div className="min-w-[400px] p-2 bg-slate-400 border-slate-900 border-2 rounded-lg">
            {children}
        </div>
    </section>

export default Card;
