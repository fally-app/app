module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
                'hero-image': "url('/bg.jpg')",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
