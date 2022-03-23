// Кнопка комментария

// Semantic
import { Button, Icon, Label } from 'semantic-ui-react'
// Всплывающая подсказка
import { MyPopup } from '../utils'

// Функция принимает количество комментариев и обработчик клика
export const CommentButton = ({ commentCount, onClick }) => (
  <Button as='div' labelPosition='right' onClick={onClick}>
    <MyPopup content='Оставить комментарий'>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
    </MyPopup>
    <Label basic color='blue' pointing='left'>
      {commentCount}
    </Label>
  </Button>
)
