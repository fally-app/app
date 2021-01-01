module.exports = {
    purge: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
                'hero-image': "url('/bg.jpg')",
            }),
        },
        fontFamily: {
            poppins: 'Poppins',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
