<svelte:head>
	<style>
		:root {
			--color-accent: rgb(0, 100, 255);
			--color-text: black;
			--color-text-secondary: black;
			--color-text-on-accent: white;
			--color-bg: white;
			--color-bg-secondary: #eee;
			--color-bg-active: rgb(220, 240, 255);
			--color-bg-warn: rgb(221, 57, 42);
			--border0: 1px solid rgba(200, 200, 200, 0.4);
			--radius0: 5px;
			--color-darken: rgba(255, 255, 255, 0.7);
			font-size: 16px;
			--nav-height: 45px;
		}

		@media (prefers-color-scheme: dark) {
			:root {
				--color-accent: rgb(50, 150, 255);
				--color-text: white;
				--color-text-secondary: #aaa;
				--color-text-on-accent: #111;
				--color-bg: #111;
				--color-bg-secondary: #222;
				--color-bg-active: rgba(50, 150, 255, 0.1);
				--color-bg-warn: rgb(200, 30, 20);
				--border0: 1px solid rgba(100, 100, 100, 0.4);
				--radius0: 5px;
				--color-darken: rgba(17, 17, 17, 0.7);
			}
		}

		body,
		html {
			overflow: hidden;
			height: 100dvh;
			overscroll-behavior: none;
			background-color: var(--color-bg);
			position: relative;
		}

		* {
			font-family: -apple-system, 'Inter', sans-serif;
			margin: 0;
			box-sizing: border-box;
			color: var(--color-text);
		}

		p {
			color: var(--color-text-secondary);
			font-size: 1em;
		}

		input {
		}
	</style>
</svelte:head>

<style>
	:global(button) {
		font-size: 1em;
	}

	:global(label) {
		font-size: 1em;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		color: var(--color-text);
	}

	:global(input) {
		border: var(--border0);
		padding: 10px 15px;
		border-radius: var(--radius0);
		width: 100%;
		background-color: var(--color-bg);
		font-size: 1em;
	}

	:global(input:focus) {
		outline: 2px solid var(--color-accent);
		outline-offset: 1px;
	}

	:global(input[type='number']) {
		-moz-appearance: textfield;
	}
	:global(input[type='number']::-webkit-outer-spin-button),
	:global(input[type='number']::-webkit-inner-spin-button) {
		-webkit-appearance: none;
		margin: 0;
	}

	:global(.row) {
		display: flex;
		column-gap: 5px;
		width: 100%;
	}

	:global(form) {
		padding: 20px;
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}
</style>
