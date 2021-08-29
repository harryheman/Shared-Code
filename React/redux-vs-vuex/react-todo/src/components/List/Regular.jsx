import { useAppContext } from '../../context'

export default function Regular({ todo }) {
  const { dispatch, actions } = useAppContext()
  const { id, text, done, edit } = todo

  return (
    <li className='list-group-item d-flex align-items-center'>
      <input
        type='checkbox'
        checked={done}
        onChange={() =>
          dispatch(actions.updateTodo({ id, changes: { done: !done } }))
        }
        className='form-check-input'
      />
      <p
        className={`flex-grow-1 m-0 ${
          done ? 'text-muted text-decoration-line-through' : ''
        }`}
      >
        {text}
      </p>
      <button
        onClick={() =>
          dispatch(actions.updateTodo({ id, changes: { edit: !edit } }))
        }
        className='btn btn-outline-info'
        disabled={done}
      >
        <i className='bi bi-pencil'></i>
      </button>
      <button
        onClick={() => dispatch(actions.removeTodo(id))}
        className='btn btn-outline-danger'
      >
        <i className='bi bi-trash'></i>
      </button>
    </li>
  )
}
