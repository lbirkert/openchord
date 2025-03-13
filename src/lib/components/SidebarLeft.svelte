<script lang="ts">
	import { openSongState } from '$lib/state.svelte.js';
	import ImportSheet from './ImportSheet.svelte';
	import Setlists from './setlist/Setlists.svelte';
	import SongLibrary from './song/SongLibrary.svelte';
	import SongView from './song/SongView.svelte';

	let { show = $bindable() }: { show: boolean } = $props();
</script>

<div class="sidebar-left" class:show>
	{#if openSongState.importFiles.length > 0}
		<ImportSheet />
	{:else if openSongState.library}
		<SongLibrary />
	{:else if openSongState.setlist !== undefined}
		<SongView />
	{:else}
		<Setlists />
	{/if}
</div>

<button
	aria-label="return to sheet"
	class="darken"
	class:show
	onclick={() => {
		show = false;
	}}
></button>

<style>
	.darken {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100dvh;
		z-index: 50;
		background-color: var(--color-darken);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		border: none;
		cursor: pointer;
	}

	.darken.show {
		opacity: 1;
		pointer-events: auto;
	}

	.sidebar-left {
		z-index: 200;

		border-right: var(--border0);
		position: absolute;
		top: var(--nav-height);
		left: -100%;
		transition: left 0.3s ease;
		display: flex;
		flex-direction: column;
		height: calc(100dvh - var(--nav-height));
		max-width: 350px;
		width: 100%;
		background-color: var(--color-bg);

		box-shadow: 12px 12px 18px -6px rgba(0, 0, 0, 0.2);
		-webkit-box-shadow: 12px 12px 18px -6px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 12px 12px 18px -6px rgba(0, 0, 0, 0.2);
	}

	@media only screen and (max-width: 400px) {
		.sidebar-left {
			max-width: 100%;
			border-right: none;
		}
	}

	.sidebar-left.show {
		left: 0;
	}
</style>
