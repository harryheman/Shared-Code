export const enhance = (form: HTMLFormElement, { updateTodos }) => {
  const onSubmit = async (e: Event) => {
    e.preventDefault()

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          accept: 'application/json'
        }
      })
      if (!res.ok) throw res
      updateTodos(res)
      form.reset()
    } catch (e) {
      console.error(e)
    }
  }

  form.addEventListener('submit', onSubmit)

  return {
    destroy() {
      form.removeEventListener('submit', onSubmit)
    }
  }
}
