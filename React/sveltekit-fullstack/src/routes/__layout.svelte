<script>
  import './layout.css'

  const title = 'Todos'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header>
  <h1>{title}</h1>
</header>

<main>
  <slot />
</main>

<footer>
  <p>&copy; Not all rights reserved</p>
</footer>