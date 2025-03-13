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
		column-gap: 20px;
		align-items: center;
		overflow: hidden;
		display: flex;
		flex-direction: row;
	}


	.title {
		font-weight: 600;
		font-size: 1.05em;
		margin-bottom: 3px;
	}

	.detail {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.description {
		font-size: 1em;
		max-height: 40px;
		width: 100%;
		overflow-wrap: break-word;
		word-break: break-word;
		text-overflow: ellipsis;
		hyphens: manual;
		overflow: hidden;
	}
</style>
