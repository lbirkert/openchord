import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['pdfjs-dist', 'mupdf'],
		include: ['pdf-lib', 'pako'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	},
	plugins: [
		sveltekit()
	]
});
