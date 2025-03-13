<script lang="ts">
	import type { Setlist } from '$lib/types.js';
	import { faList } from '@fortawesome/free-solid-svg-icons';
	import { Icon } from 'svelte-awesome';

	let { setlist }: { setlist: Setlist } = $props();
</script>

<div class="setlist">
	<div class="icon">
		<Icon data={faList} scale={1.5} />
	</div>
	<div class="detail">
		<h3 class="title">{setlist.title}</h3>
		<p class="description">{setlist.description}</p>
	</div>
</div>

<style>
	.icon {
		display: flex;
	}

	.setlist {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: row;
		column-gap: 20px;
		font-size: 1em;
		align-items: center;
	}

	.title {
		font-weight: 600;
		margin-bottom: 3px;
	}

	.description {
		font-size: 1em;
	}
</style>
