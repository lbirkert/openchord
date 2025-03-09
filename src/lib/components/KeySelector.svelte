<script lang="ts">
	import { chordBases } from "$lib/patcher.js";

    let {
        index = $bindable(),
        flat = $bindable(),
    }: { index: number, flat: boolean } = $props();

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
        ['Gb', 6, true],
    ];
</script>

<ul class="key-selector">
    {#each keys as [name, ckey, cflat]}
    <li class:active={ckey == index && cflat == flat}>
        <button onclick={() => {
            index = ckey;
            flat = cflat;
        }}>
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