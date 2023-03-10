<script>
	import Navbar from '../components/navbar.svelte';
	import NavbarElement from '../components/navbar-element.svelte';
	import Modal from '../components/modal.svelte';
	import SearchableGrid from '../components/searchableGrid.svelte';
	import FaButton from '../components/fa-button.svelte';
	let menu;
	let auth;
	let loggedIn = false;
	function toggle() {
		menu.toggleModal();
	}
	function login() {
		auth.toggleModal();
	}
	function logout() {}
</script>

<Modal title="Authenticate" id="auth-modal" bind:this={auth} />
<Modal title="Menu" id="menu-modal" bind:this={menu}>
	<SearchableGrid>
		<p name="searchable">test</p>
		<p name="searchable">lol</p>
		<p>test not seen</p>
	</SearchableGrid>
</Modal>
<Navbar>
	<NavbarElement href="/" iconClass="fa-house">Home</NavbarElement>
	<NavbarElement callback={toggle} iconClass="fa-screwdriver-wrench">Menu</NavbarElement>
	{#if loggedIn}
		<NavbarElement callback={logout} iconClass="fa-right-from-bracket">Sign Out</NavbarElement>
	{:else}
		<NavbarElement callback={login} iconClass="fa-right-to-bracket">Sign In</NavbarElement>
	{/if}
</Navbar>
<div class="body">
	<slot />
</div>

<style>
	.body {
		position: absolute;
		top: 0;
		z-index: 0;
		margin-left: 7rem;
		margin-right: 2rem;
		height: 100vh;
		width: 100vw - 5rem;
	}

	.icon-text {
		display: block;
		width: 4rem;
		text-align: right;
	}

	@media only screen and (max-width: 600px) {
		.body {
			margin-left: 2rem;
			padding-top: 5rem;
		}

		.icon-text {
			display: none;
		}
	}
</style>
