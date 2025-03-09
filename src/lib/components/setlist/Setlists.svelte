<script>
	import SetlistCreate from "./SetlistCreate.svelte";
	import SetlistView from "./SetlistView.svelte";

	let create = $state(false);
</script>

{#if create}
<SetlistCreate onback={() => create = false}/>
{:else}
<SetlistView oncreate={() => create = true}/>
{/if}