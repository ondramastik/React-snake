import React, {FC} from 'react';

interface Props {
    children?: React.ReactNode
}

const Layout: FC<Props> = ({children}) => <div
    className="w-full container mx-auto p-4 grid h-screen place-items-center">
    {children}
</div>

export default Layout;
