import { useState, useEffect } from 'react'
import { useAppContext } from '../../context'

export default function Edit({ todo }) {
  const { dispatch, actions } = useAppContext()

  const { id, text, edit } = todo
  const [newText, setNewText] = useState(text)

  const onChangeText = ({ target: { value } }) => {
    const trimmed = value.replace(/\s{2,}/g, ' ').trim()
    setNewText(trimmed)
  }
  const onFinishEdit = () => {
    if (!newText) {
      return dispatch(actions.removeTodo(id))
    }
    dispatch(
      actions.updateTodo({ id, changes: { text: newText, edit: !edit } })
    )
  }
  const onCancelEdit = () => {
    dispatch(actions.updateTodo({ id, changes: { edit: !edit } }))
  }

  const onKeyDown = ({ key }) => {
    switch (key) {
      case 'Enter':
        onFinishEdit()
        break
      case 'Escape':
        onCancelEdit()
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  })

  return (
    <li className='list-group-item d-flex align-items-center'>
      <input
        type='text'
        value={newText}
        onChange={onChangeText}
        className='form-control flex-grow-1'
      />
      <button onClick={onFinishEdit} className='btn btn-outline-success'>
        <i className='bi bi-check'></i>
      </button>
      <button onClick={onCancelEdit} className='btn btn-outline-warning'>
        <i className='bi bi-x-square'></i>
      </button>
    </li>
  )
}
