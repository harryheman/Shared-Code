import { useState, useEffect, useRef, useCallback } from 'react'

import {
  Container,
  Form,
  ListGroup,
  Button,
  ButtonGroup
} from 'react-bootstrap'

import _axios from './api'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const getAllTodos = useCallback(async () => {
    const response = await _axios.getAll()
    const todos = response.reduce((arr, { data: { text, completed }, ref }) => {
      const todo = { id: ref['@ref'].id, text, completed }
      arr.push(todo)
      return arr
    }, [])
    setTodos(todos)
    console.log(todos)
  }, [])

  useEffect(() => {
    getAllTodos()
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  })

  const createTodo = async (e) => {
    e.preventDefault()
    const newTodo = {
      text,
      completed: false
    }
    await _axios.create(newTodo)
    getAllTodos()
    setText('')
  }

  const removeTodo = async (id) => {
    await _axios.remove(id)
    getAllTodos()
  }

  const completeTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id)
    await _axios.update(id, { completed: !todo.completed })
    getAllTodos()
  }

  const updateTodo = async (e, id) => {
    await _axios.update(id, { text: e.target.value })
  }

  const removeCompletedTodos = async () => {
    const ids = todos.filter((todo) => todo.completed).map((todo) => todo.id)
    await _axios.removeCompleted(ids)
    getAllTodos()
  }

  const completeAllTodos = async () => {
    const ids = todos.filter((todo) => !todo.completed).map((todo) => todo.id)
    if (!ids.length) return
    await _axios.completeAll(ids)
    getAllTodos()
  }

  return (
    <Container>
      <h2 className='text-center mt-2'>Serverless React</h2>
      <h3 className='text-center mt-4'>Create todo</h3>
      <Form onSubmit={createTodo} className='d-flex'>
        <Form.Control
          type='text'
          placeholder='Enter todo text...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
        />
        <Button>Create</Button>
      </Form>
      <ListGroup className='mt-2'>
        {todos.map((todo) => {
          const { id, text, completed } = todo
          return (
            <ListGroup.Item key={id} className='d-flex align-items-center'>
              <Form.Check
                type='checkbox'
                checked={completed}
                onChange={() => completeTodo(id)}
              />
              <Form.Control
                type='text'
                className='fake-input'
                defaultValue={text}
                onBlur={(e) => updateTodo(e, id)}
              />
              <Button
                variant='outline-danger'
                size='sm'
                onClick={() => removeTodo(id)}
              >
                X
              </Button>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
      {!!todos.length && (
        <ButtonGroup className='mt-2'>
          <Button variant='warning' onClick={removeCompletedTodos}>
            Remove completed
          </Button>
          <Button variant='success' onClick={completeAllTodos}>
            Complete all
          </Button>
        </ButtonGroup>
      )}
    </Container>
  )
}

export default App
