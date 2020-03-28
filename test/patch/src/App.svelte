<script>
	export let name;
</script>

<main>
	<h1>Привет {name}!</h1>
	<p>Почитайте <a href="https://ru.svelte.dev/tutorial">Учебник Svelte</a>, чтобы научиться создавать приложения на Svelte.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>