import React, {FC} from 'react';

interface Props {
    children?: React.ReactNode
}

const Layout: FC<Props> = ({children}) => <div className="container mx-auto">
    <section>
        {children}
    </section>
</div>

export default Layout;
