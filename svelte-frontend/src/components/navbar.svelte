<script>
</script>

<ul>
    <slot />
</ul>

<style>
	ul {
		list-style: none;
		overflow: hidden;
		position: fixed;
		top: 0;
		z-index: 10;
		width: 5rem;
		margin: 0;
		padding: 0;
		border-style: solid;
		border-width: 0rem;
		border-right-width: 0.1rem;
		border-radius: 1rem;
		border-color: var(--border-color);
		display: flex;
		flex-direction: column;
		align-items: start;
		height: 100vh;
		background-color: var(--subtle-color);
		transition: ease 600ms;
		box-shadow: 0.5rem 0rem 1rem var(--shadow-color);
	}

	ul:hover {
		width: 10rem;
	}

    @media only screen and (max-width: 600px) {
        ul {
            height: 5rem;
            width: 100vw;
            flex-direction: row;
		    align-items: center;
            justify-content: center;
            box-shadow: 0rem 0.5rem 1rem var(--shadow-color);
            
        }

        ul:hover {
		    width: 100vw;
	    }
    }
</style>
