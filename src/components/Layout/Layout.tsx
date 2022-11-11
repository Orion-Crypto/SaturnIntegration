import { MercuryChat } from '@mercury-chat/react-chat';
import { Header } from './Header';

type LayoutProps = {
    children: React.ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main>
                <div>{children}</div>
            </main>
            <MercuryChat />
        </>
    );
};
