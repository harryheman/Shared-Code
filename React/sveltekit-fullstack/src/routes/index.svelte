<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({fetch}) => {
    const res = await fetch('/todos.json')

    if (res.ok) {
      const todos = await res.json()
      return {
        props: {todos}
      }
    }

    const { message } = await res.json()
    return {
      error: new Error(message)
    }
  }
</script>

<script lang="ts">
  import NewTodo from '$lib/new-todo.svelte'
  import TodoItem from '$lib/todo-item.svelte'

  export let todos: Todo[]

  const updateTodos = async (res: Response) => {
    const _todos = await res.json()
    todos = _todos
  }
</script>

<div class="todos-container">
  <NewTodo {updateTodos} />

  {#each todos as todo}
    <TodoItem {todo} {updateTodos} />
  {/each}
</div>

<style>
  .todos-container {
    margin-top: 2rem;
    width: 100%;
    max-width: 42rem;
  }

  .todos-container :global(input) {
    border: 1px solid transparent;
  }

  .todos-container :global(input:focus-visible) {
    box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ff3e00 !important;
    outline: none;
  }
</style>