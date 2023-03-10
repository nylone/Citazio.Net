<script>
	let input;

	export function value() {
		return input;
	}
</script>

<input bind:value={input} type="text" name="search" id="searchbar" placeholder="search..." on:input />

<style>
	input {
		border-radius: 1rem;
		font-size: 2rem;
		background-color: var(--special-bg-color);
		border-width: 0.1rem;
		border-style: hidden;
		text-align: center;
		color: var(--special-text-color);
	}

	input:focus {
		outline: none;
	}
</style>
