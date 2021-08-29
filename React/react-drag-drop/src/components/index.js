import { memo, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { initialState } from '../initial-state'
import { Column } from './Column'

const Container = styled.div`
  display: flex;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`

const InnerList = memo(({ column, todoMap, index }) => {
  const todos = column.todoIds.map((todoId) => todoMap[todoId])
  return <Column column={column} todos={todos} index={index} />
})

export const App = () => {
  const [state, setState] = useState(initialState)

  /*
  const handleDragStart = () => {
    document.body.style.color = 'darkorange'
    document.body.style.transition = 'background-color .2s ease'
  }

  const handleDragUpdate = (update) => {
    const { destination } = update
    const opacity = destination
      ? destination.index / Object.keys(state.todos).length
      : 0
    document.body.style.backgroundColor = `rgba(152, 140, 218, ${opacity})`
  }
  */

  const handleDragStart = (start) => {
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId)

    setState({
      ...state,
      homeIndex
    })
  }

  const handleDragEnd = (result) => {
    // document.body.style.color = 'inherit'
    // document.body.style.backgroundColor = 'inherit'

    setState({
      ...state,
      homeIndex: null
    })

    const { source, destination, draggableId, type } = result

    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'column') {
      const newColumnOrder = [...state.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      }

      setState(newState)
      return
    }

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTodoIds = [...start.todoIds]
      newTodoIds.splice(source.index, 1)
      newTodoIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        todoIds: newTodoIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
      return
    }

    const startTodoIds = [...start.todoIds]
    startTodoIds.splice(source.index, 1)
    const newStart = {
      ...start,
      todoIds: startTodoIds
    }

    const finishTodoIds = [...finish.todoIds]
    finishTodoIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      todoIds: finishTodoIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setState(newState)
  }

  return (
    <>
      <Title>React Drag &amp; Drop</Title>
      <DragDropContext
        onDragStart={handleDragStart}
        // onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId]
                // const isDropDisabled = index < state.homeIndex

                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    todoMap={state.todos}
                    // isDropDisabled={isDropDisabled}
                    index={index}
                  />
                )
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

/*
const result = {
  draggableId: 'todo-1',
  type: 'TYPE',
  reason: 'DROP',
  source: {
    droppable: 'col-1',
    index: 0
  },
  destination: {
    droppableId: 'col-1',
    index: 1
  }
}
*/
