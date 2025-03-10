<script lang="ts">
	import FileDragNDrop from '$lib/components/FileDragNDrop.svelte';

	import Theme from '$lib/components/Theme.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/SidebarRight.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import SheetViewer from '$lib/components/SheetViewer.svelte';
	import SpinnerOverlay from '$lib/components/SpinnerOverlay.svelte';

	let files: File[] | undefined = $state();

	let showLeft: boolean = $state(true);
	let showRight: boolean = $state(false);

	let show = $state(false);
	let showAnimate = $state(false);
	onMount(async () => {
		await document.fonts.ready;
		show = true;
		setTimeout(() => showAnimate = true);
	});

	// Make sure to import the worker in the browser
	if (browser) import('pdfjs-dist/build/pdf.worker' as any);
</script>

<Theme />

<SpinnerOverlay hide={show} />

{#if show}
<FileDragNDrop onfiles={(files_) => (files = files_)} />

<main class:show={showAnimate}>
	<Navbar bind:showLeft bind:showRight />
	<SidebarLeft bind:show={showLeft} />
	<SidebarRight bind:show={showRight} />
	<SheetViewer />
</main>
{/if}

<style>
	main {
		height: 100%;
		display: flex;
		flex-direction: column;
		transform: scale(1.05);
		transition: transform 0.6s ease;
	}

	main.show {
		transform: none;
	}
</style>
