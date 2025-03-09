import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	},
	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/mupdf/dist/mupdf-wasm.wasm',
					dest: 'node_modules/.vite/deps',
				}
			]
		}),
		sveltekit()
	]
});
