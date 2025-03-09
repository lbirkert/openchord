<script lang="ts">
	import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons';
	import SortableList from './SortableList.svelte';
	import { Icon } from 'svelte-awesome';
	import { openSongState } from '$lib/state.svelte.js';

	let fileInput: HTMLInputElement;
	let files: FileList | undefined = $state();

	$effect(() => {
		if (files !== undefined) {
			Promise.all([...files].map((f) => f.bytes())).then((contents) => {
				openSongState.importFiles.push(...contents);
			});
			fileInput.value = '';
		}
	});
</script>

<header>
	<button><Icon data={faArrowLeft} /></button>
	<p>Current Setlist Title</p>
</header>

<SortableList />

<footer>
	<span></span>
	<button
		onclick={() => {
			fileInput.click();
		}}>+ Import</button
	>
</footer>

<input type="file" id="file-input" bind:this={fileInput} bind:files />

<style>
	p {
		font-weight: 600;
	}

	#file-input {
		display: none;
	}

	header {
		width: 100%;
		height: 40px;
		border-bottom: var(--border0);
		display: flex;
		align-items: center;
		column-gap: 20px;
		padding: 10px 20px;
	}

	header button {
		background-color: transparent;
		display: flex;
		border: none;
		padding: 0;
		color: var(--color-accent);
		cursor: pointer;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: var(--border0);
		width: 100%;
		height: 40px;
		padding: 10px 20px;
	}

	footer > button {
		background: transparent;
		border: none;
		color: var(--color-accent);
		cursor: pointer;
	}
</style>
