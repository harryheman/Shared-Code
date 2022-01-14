import { useState } from 'react'
// Хук для получения диспетчера
import { useDispatch } from 'react-redux'
// Утилита для генерации уникальных идентификаторов
import { nanoid } from '@reduxjs/toolkit'
// Операция для добавления новой задачи
import { addTodo } from '../store'

// Компонент для добавления новой задачи
export default function New() {
  // Получаем диспетчера
  const dispatch = useDispatch()
  // Локальное состояние для текста новой задачи
  const [text, setText] = useState('')

  // Функция для изменения текста задачи
  const changeText = ({ target: { value } }) => {
    // Заменяем два и более пробела на один и удаляем пробелы в начале и конце строки
    const trimmed = value.replace(/\s{2,}/g, ' ').trim()
    setText(trimmed)
  }

  // Функция для добавления задачи
  const onAddTodo = (e) => {
    e.preventDefault()

    if (!text) return

    const newTodo = {
      id: nanoid(5),
      text,
      done: false,
      edit: false
    }
    // Отправляем операцию для добавления новой задачи
    dispatch(addTodo(newTodo))

    setText('')
  }

  return (
    <form onSubmit={onAddTodo} className='d-flex mb-4'>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={text}
        onChange={changeText}
        className='form-control flex-grow-1'
      />
      <button className='btn btn-outline-success'>
        <i className='bi bi-plus-square'></i>
      </button>
    </form>
  )
}
