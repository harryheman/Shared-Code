/// <reference types="@sveltejs/kit" />

type Todo = {
  uid: string
  text: string
  done: boolean
  created_at: Date
}

type Changes = Partial<Todo>
