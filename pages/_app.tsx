import { AppProps } from 'next/app';
import '../public/styles/globals.css';
import { Layout } from '../src/components/Layout/Layout';

const App = ({ Component, pageProps }: AppProps | any) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default App;
