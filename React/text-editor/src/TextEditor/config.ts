import { DefaultDraftBlockRenderMap, DraftEditorCommand } from 'draft-js'
import Immutable from 'immutable'

export enum BlockType {
  /* Заголовки */
  h1 = 'header-one',
  h2 = 'header-two',
  h3 = 'header-three',
  h4 = 'header-four',
  h5 = 'header-five',
  h6 = 'header-six',
  /* Цитата */
  blockquote = 'blockquote',
  /* Блок с кодом */
  code = 'code-block',
  /* Список */
  list = 'unordered-list-item',
  /* Нумерованный список */
  orderList = 'ordered-list-item',
  /* Сноска */
  cite = 'cite',
  /* Простой текст */
  default = 'unstyled'
}

export enum InlineStyle {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
  ACCENT = 'ACCENT'
}

export enum EntityType {
  link = 'link'
}

export const BLOCK_LABELS = {
  [BlockType.h1]: 'Заголовок 1',
  [BlockType.h2]: 'Заголовок 2',
  [BlockType.h3]: 'Заголовок 3',
  [BlockType.h4]: 'Заголовок 4',
  [BlockType.h5]: 'Заголовок 5',
  [BlockType.h6]: 'Заголовок 6',
  [BlockType.blockquote]: 'Цитата',
  [BlockType.code]: 'Блок с кодом',
  [BlockType.list]: 'Маркированный список',
  [BlockType.orderList]: 'Нумерованный список',
  [BlockType.cite]: 'Сноска',
  [BlockType.default]: 'Обычный текст'
}

export type KeyCommand = DraftEditorCommand | 'accent'

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: 'cite'
  }
})

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(
  CUSTOM_BLOCK_RENDER_MAP
)

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.ACCENT]: {
    backgroundColor: '#3c3c3c',
    color: '#f0f0f0'
  }
}
