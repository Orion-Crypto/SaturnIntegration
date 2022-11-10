import { AppProps } from 'next/app';
import '../public/styles/globals.css';


const App = ({ Component, pageProps }: AppProps | any) => {
    return (
        <Component {...pageProps} />
    );
};

export default App;