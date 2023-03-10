<script>
	import Searchbar from './searchbar.svelte';

	let searchbar;
	function filter() {
		const query = searchbar.value();

		const elements = document.getElementsByName('searchable');
		elements.forEach((element) => {
			if (element.innerText.includes(query)) {
				element.style.visibility = 'visible';
			} else {
				element.style.visibility = 'collapse';
			}
		});
	}
</script>

<Searchbar bind:this={searchbar} on:input={filter} />
<slot />
