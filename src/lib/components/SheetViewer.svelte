<script lang="ts">
	import { getSheet } from '$lib/patch.js';
	import { openSongState } from '$lib/state.svelte.js';

	let url: string | undefined = $state();
	let iframeUrl = $derived(openSongState.importPreview ?? url);
	async function load() {
		if(openSongState.song === undefined) return;
		const data = await getSheet(openSongState.song!);
		if (url !== undefined) URL.revokeObjectURL(url);
		url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
	}
	$effect(() => {
		load();
	});
</script>

<div class="sheet">
	{#if iframeUrl !== undefined}
		<iframe src={iframeUrl} title=""></iframe>
	{:else}
		<div class="bg"></div>
	{/if}
</div>

<style>
	.sheet {
		height: calc(100dvh - 40px);
		width: 100vw;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: stretch;
		justify-content: stretch;
	}

	.sheet {
		flex: 1;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.bg {
		width: 100%;
		height: 100%;
		background-image: url("/pattern_light.png");
		background-repeat: repeat;
		background-size: 20px;
	}

	@media(prefers-color-scheme: dark) {
		.bg {
			background-image: url("/pattern_dark.png");
		}
	}
</style>
