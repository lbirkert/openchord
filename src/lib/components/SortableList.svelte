<script lang="ts">
	import { onMount } from 'svelte';
	import { press } from 'svelte-gestures';

	let {
		item,
		length,
		onrearange,
	}: {
		item: (index: number) => any,
		length: number,
		onrearange: (el: number, to: number) => void,
	} = $props();

	let rearange = false;

	let dragIndex: number | undefined = $state();
	let dragX = 0;
	let dragY = 0;

	onMount(() => {
		window.addEventListener('mousemove', (e) => {
			dragX = e.x - 5;
			dragY = e.y - 5;
		});
		window.addEventListener('mouseup', () => {
			if (dragIndex === undefined) return;

			const tops = elements.map((e, i) => [i, e?.getBoundingClientRect().top]);
			const el = tops.reverse().find((t) => t[1] < dragY);

			if (el !== undefined) {
				let toIndex = el[0] + 1;
				onrearange(dragIndex, toIndex);
			}

			dragIndex = undefined;
		});
	});

	let elements: HTMLLIElement[] = $derived(new Array(length));
</script>

<ul>
	{#each new Array(length), i}
		<li
			style="--i: {i}px"
			use:press={() => ({
				timeframe: 300,
				triggerBeforeFinished: true
			})}
			bind:this={elements[i]}
			onpress={() => (dragIndex = i)}
			class:drag={dragIndex === i}
		>
			{@render item(i)}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		padding: 20px 20px;
		position: relative;
		flex: 1;
		height: 100%;
		overflow-y: scroll;
	}

	ul li {
		cursor: pointer;
		height: 40px;
		width: 100%;
		background-color: var(--color-bg);
		position: absolute;
		top: calc(calc(var(--i) * 60) + 20px);
		width: calc(100% - 40px);
		margin-bottom: 20px;
	}

	ul li.drag {
		opacity: 0;
	}
</style>
