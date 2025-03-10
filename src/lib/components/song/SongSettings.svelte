<script lang="ts">
	import { openSongState } from '$lib/state.svelte.js';
	import deepcopy from 'deepcopy';
	import KeySelector from '../KeySelector.svelte';
	import Sidebar from '../Sidebar.svelte';
	import { db } from '$lib/db.js';

	$effect(() => {
        if(openSongState.song === undefined) return;
		const song = deepcopy(openSongState.song);
		(async () => {
			await (await db.get()).put('song', song);
		})();
	});
</script>

<Sidebar>
	{#snippet header()}
		Song Settings
	{/snippet}
	{#snippet main()}
		<form>
			{#if openSongState.song}
				<label>
					Edit Key
					<KeySelector bind:key={openSongState.song.meta.key} />
				</label>
				<label>
					Edit Capo
					<input type="number" bind:value={openSongState.song.meta.capo} />
				</label>
			{:else}
				Please open a Song first
			{/if}
		</form>
	{/snippet}
	{#snippet footer()}
		<button> + Edit metadata </button>
		<span></span>
	{/snippet}
</Sidebar>
