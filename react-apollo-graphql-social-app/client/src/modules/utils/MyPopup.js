// Всплывающая подсказка

// Semantic
import { Popup } from 'semantic-ui-react'

export const MyPopup = ({ content, children }) => (
  <Popup inverted content={content} trigger={children} />
)
