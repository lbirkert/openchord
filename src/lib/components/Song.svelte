<script lang="ts">
	import { chordBases } from '$lib/patcher.js';
	import type { SongMeta } from '$lib/types.js';

	let { song }: { song: SongMeta } = $props();

	let key = $derived(chordBases[song.key.index][song.key.flat ? 1 : 0]);
</script>

<div class="song">
	<p class="title">{song.title}</p>
	<p class="description">
		{song.author} | in {key} | {song.tempo} BMP | {song.timeSignature}
	</p>
</div>

<style>
	.song {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-weight: 600;
	}

	.description {
		font-size: 10px;
	}
</style>
