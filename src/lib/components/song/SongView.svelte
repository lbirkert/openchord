<script lang="ts">
	import SortableList from '../SortableList.svelte';
	import { openSongState } from '$lib/state.svelte.js';
	import Sidebar from '../Sidebar.svelte';
	import { db } from '$lib/db.js';
	import SongWidget from './SongWidget.svelte';
	import SidebarLoad from '../SidebarLoad.svelte';
	import type { Song } from '$lib/types.js';
	import deepcopy from 'deepcopy';
	import hash from 'object-hash';
	import { rearangeArray } from '$lib/util.js';

	let fileInput: HTMLInputElement;
	let files: FileList | undefined = $state();

	function readFile(file: File): Promise<ArrayBuffer> {
		return new Promise((res) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = () => res(reader.result as ArrayBuffer);
		});
	}

	$effect(() => {
		if (files !== undefined) {
			Promise.all([...files].map(readFile)).then((contents) => {
				openSongState.importFiles.push(...contents);
			});
			fileInput.value = '';
		}
	});

	let songs: Song[] = $state([]);
	async function loadSongs(): Promise<void> {
		const songIds = openSongState.setlist!.songs;
		const tx = (await db.get()).transaction('song', 'readonly');
		songs = (await Promise.all(songIds.map((songId) => tx.store.get(songId)))).filter(
			(song) => song !== undefined
		);
		tx.commit();
	}
	let songsPromise = loadSongs();

	$effect(() => {
		if (openSongState.song === undefined) return;

		const song = openSongState.song;
		const songHash = hash(song);

		const index = songs.findIndex((s) => s.id === song.id);
		if (songHash !== hash(songs[index] ?? {})) songs[index] = deepcopy(song);
	});

	// name might be confusing, only removes from setlist not from library
	async function deleteSong(index: number): Promise<void> {
		songs.splice(index, 1);
		openSongState.setlist!.songs.splice(index, 1);
		const setlist = deepcopy(openSongState.setlist!);
		await (await db.get()).put('setlist', setlist);
	}

	async function rearange(index: number, toIndex: number) {
		rearangeArray(songs, index, toIndex);
		const setlist = deepcopy(openSongState.setlist!);
		rearangeArray(setlist.songs, index, toIndex);
		await (await db.get()).put('setlist', setlist);
	}
</script>

<Sidebar
	onback={() => {
		openSongState.setlist = undefined;
	}}
>
	{#snippet header()}
		{openSongState.setlist!.title}
	{/snippet}

	{#snippet main()}
		{#await songsPromise}
			<SidebarLoad />
		{:then}
			<SortableList
				active={(i) => songs[i].id === openSongState.song?.id}
				onrearange={rearange}
				ondelete={deleteSong}
				onclick={(i) => {
					openSongState.song = deepcopy(songs[i]);
				}}
				length={songs.length}
				itemHeight={100}
			>
				{#snippet item(i)}
					<SongWidget song={songs[i].meta} />
				{/snippet}
			</SortableList>
		{/await}
	{/snippet}
	{#snippet footer()}
		<button
			onclick={() => {
				openSongState.library = true;
			}}
		>
			+ From library
		</button>
		<button
			onclick={() => {
				fileInput.click();
			}}>+ From file</button
		>
	{/snippet}
</Sidebar>

<input type="file" id="file-input" bind:this={fileInput} bind:files multiple />

<style>
	#file-input {
		display: none;
	}
</style>
