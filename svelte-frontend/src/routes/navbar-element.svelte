<script>
	export let iconClass;
	export let href;
	export let callback;
</script>

<li>
	{#if href}
		<a {href} >
			<i class="icon fa-solid {iconClass}" />
			<span class="icon-text">
				<slot />
			</span>
		</a>
	{:else if callback}
		<button on:click={callback}>
			<i class="icon fa-solid {iconClass}" />
			<span class="icon-text">
				<slot />
			</span>
		</button>
	{/if}
</li>

<style>
	.icon {
		min-width: 2rem;
		min-height: 2rem;
		margin: 1rem 1.5rem 1rem 1.5rem;
		font-size: 2rem;
	}

	.icon-text {
		display: block;
		width: 4rem;
		text-align: right;
	}

	a, button {
		text-decoration: none;
		background-color: inherit;
		border: inherit;
		color: inherit;
		transition: ease 600ms;
		font-size: 1rem;
	}

	a:hover, button:hover {
		color: var(--special-text-color);
	}

	a,
	button,
	li {
		overflow: hidden;
		white-space: nowrap;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		text-align: center;
	}

	li:last-child {
		margin-top: auto;
	}

	@media only screen and (max-width: 600px) {
		li:last-child {
			margin-top: inherit;
		}

		.icon-text {
			display: none;
		}
	}
</style>
