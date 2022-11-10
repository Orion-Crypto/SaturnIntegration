module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                space: {
                    100: '#482CA2',
                    200: '#441C9F',
                    300: '#35118E',
                    400: '#250A7A',
                    500: '#180562',
                    600: '#190553',
                    700: '#15063E',
                    800: '#0D0529',
                    900: '#030418',
                },
                lightspace: {
                    50: '#9A8ADB',
                    100: '#8976D5',
                    200: '#684FC9',
                    300: '#4E36B0',
                    400: '#3B2985',
                    500: '#2A1D5F',
                    600: '#21174A',
                    700: '#1A123B',
                    800: '#110C27',
                    900: '#090614',
                },
            },
            dropShadow: {
                'black-sharp': '0px 4px 16px rgba(0, 0, 0, 0.5)',
            },
            width: {
                104: '26rem',
            },
        },
    },
    plugins: [],
};
