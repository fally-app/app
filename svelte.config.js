import preprocess from 'svelte-preprocess';
import fs from 'fs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	vite: {
		srr: {
			external: Object.keys(pkg.dependancies || {})
		}
	}
};

export default config;
