<script>
	export let iconClass;
	export let callback;
</script>

<button on:click={callback}>
	<i class="icon fa-solid {iconClass}" />
</button>

<style>
	.icon {
		min-width: 2rem;
		min-height: 2rem;
		margin: 0rem 0rem 0rem 0rem;
		font-size: 2rem;
	}

	button {
		text-decoration: none;
		background-color: inherit;
		border: inherit;
		color: inherit;
		transition: ease 600ms;
	}

	button:hover {
		color: var(--special-text-color);
	}

	button {
		overflow: hidden;
		white-space: nowrap;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		text-align: center;
	}
</style>
