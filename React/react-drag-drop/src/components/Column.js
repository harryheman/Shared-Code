import { memo } from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TodoItem } from './TodoItem'

const Container = styled.div`
  margin: 8px;
  width: 220px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  text-align: center;
`
const TodoList = styled.ul`
  padding: 8px;
  list-style: none;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'skyblue' : 'inherit'};
  transition: background-color 0.2s ease;

  flex-grow: 1;
  min-height: 100px;
`

const InnerList = memo(({ todos, isCompleted }) =>
  todos.map((todo, index) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      isCompleted={isCompleted}
      index={index}
    />
  ))
)

export const Column = ({ column, todos, isDropDisabled, index }) => {
  const isCompleted = column.title === 'Completed'
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            isDropDisabled={isDropDisabled}
            type='todo'
          >
            {(provided, snapshot) => (
              <TodoList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList todos={todos} isCompleted={isCompleted} />
                {provided.placeholder}
              </TodoList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}
