import { useState, useEffect } from 'react'
// Хук для получения диспетчера
import { useDispatch } from 'react-redux'
// Операции для обновления и удаления задачи
import { updateTodo, removeTodo } from '../../store'

// Элемент списка для редактирования задачи
// Получает задачу
export default function Edit({ todo }) {
  // Получаем диспетчера
  const dispatch = useDispatch()
  // Извлекаем все свойства задачи, кроме индикатора завершенности
  const { id, text, edit } = todo
  // Локальное состояние для текста редактируемой задачи
  const [newText, setNewText] = useState(text)

  // Функция для изменения текста
  const onChangeText = ({ target: { value } }) => {
    const trimmed = value.replace(/\s{2,}/g, ' ').trim()
    setNewText(trimmed)
  }
  // Функция для завершения редактирования
  const onFinishEdit = () => {
    // Если текст отсутствует, вероятно, пользователь хочет удалить задачу
    if (!newText) {
      return dispatch(removeTodo(id))
    }
    // Отправляем операцию для обновления текста задачи
    dispatch(updateTodo({ id, changes: { text: newText, edit: !edit } }))
  }
  // Функция для отмены редактирования
  const onCancelEdit = () => {
    // Отправляем операцию для изменения индикатора редактирования
    dispatch(updateTodo({ id, changes: { edit: !edit } }))
  }

  // Функция для обработки нажатия клавиш клавиатуры:
  // если нажата клавиша "Enter", завершаем редактирование,
  // если нажата клавиша "Escape", отменяем редактирование
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

  // Регистрируем обработчик нажатия клавиш
  // и удаляем его при размонтировании компонента
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
