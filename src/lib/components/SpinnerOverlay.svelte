<script>
	import { minus } from 'svelte-awesome/icons';
	import Spinner from './Spinner.svelte';

	let { hide } = $props();
</script>

<svelte:head>
	<style>
		.spinner-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100dvh;
			background-color: var(--color-bg);
			z-index: 1000;
			display: flex;
			flex-direction: column;
			gap: 10px;
			align-items: center;
			justify-content: center;
			transition: opacity 0.6s ease;
		}

		.spinner-overlay h1 {
            color: var(--color-accent);
			font-size: min(4em, 10vw);
			font-family: 'Dela Gothic One', sans-serif;
		}

		.spinner-overlay h3 {
			height: 25px;
            color: var(--color-text);
			font-size: 1em;
			font-weight: bold;
			display: flex;
			gap: 8px;
			align-items: center;
            height: 25px;
		}

        .spinner-overlay h3 .spinner {
            transform: translateY(1px);
        }
	</style>
</svelte:head>

<div class="spinner-overlay" class:hide>
	<h1>OPENCHRD</h1>
	<h3>
		<Spinner scale={0.8} />
		Loading Assets...
    </h3>
</div>

<style>
	.spinner-overlay.hide {
		pointer-events: none;
		opacity: 0;
	}
</style>
