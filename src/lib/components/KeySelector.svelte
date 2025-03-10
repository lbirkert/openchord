<script lang="ts">
	import type { Key } from '$lib/types.js';

	let { key = $bindable() }: { key: Key } = $props();

	const keys: [string, number, boolean][] = [
		['C', 0, false],
		['G', 7, false],
		['D', 2, false],
		['A', 9, false],
		['E', 4, false],
		['B', 11, false],
		['F#', 6, false],
		['F', 5, true],
		['Bb', 10, true],
		['Eb', 3, true],
		['Ab', 8, true],
		['Db', 1, true],
		['Gb', 6, true]
	];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<ul class="key-selector" onclick={(e: any) => e.preventDefault()}>
	{#each keys as [name, index, flat]}
		<li class:active={key !== undefined && index === key[0] && flat === key[1]}>
			<button
				onclick={(e: any) => {
					// Fix issue with parent clicks getting detected as C-click
					// if (e.explicitOriginalTarget !== e.target) return;
					key = [index, flat];
				}}
			>
				{name}
			</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		row-gap: 5px;
		column-gap: 5px;
		flex-wrap: wrap;
		padding: 0;
	}

	button {
		height: 30px;
		width: 30px;
		background-color: transparent;
		border: var(--border0);
		border-radius: var(--radius0);
		cursor: pointer;
	}

	li.active button {
		border: 2px solid var(--color-accent);
	}
</style>
