<script>
	import Sidebar from '../Sidebar.svelte';
	import SortableList from '../SortableList.svelte';

	const { oncreate } = $props();
</script>

<Sidebar>
	{#snippet header()}
		View Setlists
	{/snippet}
	{#snippet main()}
		<SortableList length={10} onrearange={console.log}>
			{#snippet item(i)}
				<p>{i} Lorem Ipsum Setlist</p>
			{/snippet}
		</SortableList>
	{/snippet}
	{#snippet footer()}
		<span></span>
		<button onclick={oncreate}>+ Create</button>
	{/snippet}
</Sidebar>