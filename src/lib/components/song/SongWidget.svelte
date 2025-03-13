<script lang="ts">
	import { dumpKey } from '$lib/chord.js';
	import type { SongMeta } from '$lib/types.js';
	import { faMusic } from '@fortawesome/free-solid-svg-icons';
	import { Icon } from 'svelte-awesome';

	let { song }: { song: SongMeta } = $props();

	let key = $derived(dumpKey(song.key));

	let description = $derived(
		`${song.description} | in ${key}`
	);
</script>

<div class="song">
	<div class="icon">
		<Icon data={faMusic} scale={1.5} />
	</div>
	<div class="detail">
		<h4 class="title">{song.title}</h4>
		<p class="description">{description}</p>
	</div>
</div>

<style>
	.icon {
		display: flex;
	}

	.song {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: row;
		column-gap: 20px;
		align-items: center;
	}

	.title {
		font-weight: 600;
		font-size: 1em;
		margin-bottom: 3px;
	}

	.description {
		font-size: 1em;
	}
</style>
