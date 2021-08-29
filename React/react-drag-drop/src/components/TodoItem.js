import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging, isDragDisabled }) =>
    isDragDisabled ? 'lightgray' : isDragging ? 'lightgreen' : 'white'};
  border: 1px solid lightgray;
  border-radius: 2px;
  text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : '')};
  opacity: ${({ isCompleted }) => (isCompleted ? '.6' : '')};
  user-select: none;
`

const Handle = styled.div`
  margin-right: 8px;
  width: 14px;
  height: 14px;
  background-color: darkorange;
  border-radius: 4px;
`

export const TodoItem = ({ todo, isCompleted, index }) => {
  const isDragDisabled = todo.id === 'todo-2'
  return (
    <Draggable
      draggableId={todo.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          isCompleted={isCompleted}
        >
          <Handle {...provided.dragHandleProps} />
          {todo.body}
        </Container>
      )}
    </Draggable>
  )
}

/*
// Draggable
const draggableSnapshot = {
  isDragging: true,
  draggingOver: 'col-1'
}

// Droppable
const droppableSnapshot = {
  isDraggingOver: true,
  draggingOverWith: 'todo-1'
}
*/
