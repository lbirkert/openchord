<script lang="ts">
	import { faMusic } from '@fortawesome/free-solid-svg-icons';
	import { Icon } from 'svelte-awesome';

	let {
		showLeft = $bindable(),
		showRight = $bindable()
	}: { showLeft: boolean; showRight: boolean } = $props();
</script>

<header>
	<button
		class:active={showLeft}
		onclick={() => {
			if ((showLeft = !showLeft)) showRight = false;
		}}>Songs</button
	>
	<a href={import.meta.env.VITE_PUBLIC_BASE_URL}>
		<h1>OPENSONG</h1>
	</a>
	<button
		class:active={showRight}
		onclick={() => {
			if ((showRight = !showRight)) showLeft = false;
		}}>Settings</button
	>
</header>

<style>
	header {
		z-index: 200;
		background-color: var(--color-bg);
		height: 40px;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		border-bottom: 2px solid var(--color-accent);
	}

	button {
		border: none;
		background-color: transparent;
		border-radius: var(--radius0);
		color: var(--color-accent);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		padding: 3px 10px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	button.active {
		background-color: var(--color-accent);
		color: var(--color-text-on-accent);
	}

	h1 {
		font-size: 15px;
		font-weight: 100;
		font-family: 'Dela Gothic One', sans-serif;
		color: var(--color-accent);
	}
	
	a {
		text-decoration: none;
	}
</style>
