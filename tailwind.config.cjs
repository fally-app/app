const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			display: ['Open Sans', 'sans-serif']
		},
		backgroundColor: (theme) => ({
			...theme('colors'),
			primary: '#FFA92D'
		}),
		extend: {}
	},

	plugins: []
};

module.exports = config;
