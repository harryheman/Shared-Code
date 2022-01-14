import { useAppContext } from '../context'

export default function Controls() {
  const { state, dispatch, actions } = useAppContext()
  const { todos } = state

  return (
    <div className='col-3 d-flex flex-column'>
      <h3>Controls</h3>
      {todos.length ? (
        <>
          <button
            onClick={() => dispatch(actions.completeTodos())}
            className='btn btn-info mb-2'
          >
            Complete
          </button>
          <button
            onClick={() => dispatch(actions.clearCompleted())}
            className='btn btn-danger mb-2'
          >
            Clear
          </button>
        </>
      ) : null}
      <button
        onClick={() => dispatch(actions.saveTodos(todos))}
        className='btn btn-success'
      >
        Save
      </button>
    </div>
  )
}
