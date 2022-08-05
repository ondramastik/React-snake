import React, {FC} from 'react';

interface Props {
    children?: React.ReactNode
}

const Layout: FC<Props> = ({children}) => <div className="bg-slate-700 p-4 grid h-screen place-items-center">
    <section>
        <div>
            {children}
        </div>
    </section>
</div>

export default Layout;
