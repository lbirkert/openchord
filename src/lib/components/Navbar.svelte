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
	<h1>
		<Icon data={faMusic} />
		OpenSong
	</h1>
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

		box-shadow: 0px 12px 18px -6px rgba(0,0,0,0.2);
		-webkit-box-shadow: 0px 12px 18px -6px rgba(0,0,0,0.2);
		-moz-box-shadow: 0px 12px 18px -6px rgba(0,0,0,0.2);
	}

	button {
		border: 2px solid var(--color-accent);
		background-color: transparent;
		border-radius: var(--radius0);
		color: var(--color-accent);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		padding: 0px 10px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	button.active {
		background-color: var(--color-accent);
		color: white;
	}

	h1 {
		font-size: 18px;
        font-weight: 100;
	}
</style>
