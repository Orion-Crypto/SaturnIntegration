import Head from 'next/head';

export const Header = () => {
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Saturn is the #1 NFT Creation Platform on Cardano! Saturn handles all of the technology to make your NFT project more successful by leveraging our NFT creation system, image upload system, image generation system and payment gateway. We focus on the tech so you don't have to!"
                />
                <title>Saturn</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    );
};
