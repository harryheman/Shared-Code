<script lang="ts">
  import { enhance } from '$lib/actions/form'

  export let updateTodos: (res: Response) => void
</script>

<form action="/todos.json" method="post" class="new_todo-form" use:enhance={{updateTodos}}>
  <input type="text" name="text" aria-label="Add todo" placeholder="+ tap to add todo" required class="new_todo-input" autocomplete="off" />
</form>

<style>
  .new_todo-form {
    margin-bottom: .5rem;
  }

  .new_todo-input {
    font-size: 28px;
    width: 100%;
    padding: 0.5em 1em 0.3em 1em;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
  }
</style>