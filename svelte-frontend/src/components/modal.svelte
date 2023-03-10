<script>
	import FaButton from './fa-button.svelte';
	import Searchbar from './searchbar.svelte';

	export let title;
	export let id;
	export function toggleModal(modal) {
		const element = document.getElementById(id);
		const display = element.style.display;
		element.style.display = display === 'flex' ? 'none' : 'flex';
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section {id} on:click={toggleModal}>
	<div class="container col" on:click|stopPropagation>
		<div class="row">
			<h1>{title}</h1>
			<FaButton iconClass="fa-close" callback={toggleModal} />
		</div>
		<slot />
	</div>
</section>

<style>
	section {
		z-index: 1000;
		display: none;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(var(--shadow-color-rgb), 0.3);
	}

	.container {
		border-radius: 1rem;
		z-index: 1010;
		background-color: var(--subtle-color);
		box-shadow: 0.5rem 0rem 1rem var(--shadow-color);
		width: 50rem;
		max-width: 100%;
		height: 50rem;
		max-height: calc(100vh - 5rem);
		overflow: scroll;
		margin: 2rem 2rem 2rem 2rem;
		padding: 1rem 2rem 1rem 2rem;
		display: flex;
	}

	.col {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}

	.row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap-reverse;
	}
</style>
