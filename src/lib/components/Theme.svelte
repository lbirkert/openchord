<style>
	@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:global(body) {
		overflow-x: hidden;
		height: 100vh;
	}

	:global(html) {
		overflow: hidden;
	}

	:global(:root) {
		--color-accent: rgb(0, 100, 255);
		--color-bg: white;
		--border0: 1px solid rgba(0, 0, 0, 0.1);
		--radius0: 5px;
	}

	:global(*) {
		font-family: 'Poppins', sans-serif;
		margin: 0;
		box-sizing: border-box;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Bagel Fat One', sans-serif;
	}

	:global(input) {
		border: var(--border0);
		padding: 5px 10px;
		border-radius: var(--radius0);
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

	:global(label) {
		font-size: 12px;
	}

	:global(input) {
		width: 100%;
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
		overflow-y: scroll;
	}
</style>
