import { useEditorApi } from './context'
import cn from 'classnames'
import './styles/ToolPanel.scss'
import { InlineStyle, BlockType } from './config'

export type ToolPanelProps = {
  className?: string
}

export const ToolPanel: React.FC<ToolPanelProps> = ({ className }) => {
  const { toggleBlockType, currentBlockType, toggleInlineStyle, hasInlineStyle, addLink, toHtml } = useEditorApi()

  const _addLink = () => {
    const url = prompt('URL:')

    if (url) {
      addLink(url)
    }
  }

  return (
    <div className={cn('tool-panel', className)}>
      <button
        className={cn(
          "tool-panel_item",
          currentBlockType === BlockType.h1 && "tool-panel_item-active"
        )}
        onClick={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h1);
        }}
      >
        Заголовок
      </button>
      <button
        className={cn(
          "tool-panel_item",
          currentBlockType === BlockType.h2 && "tool-panel_item-active"
        )}
        onClick={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h2);
        }}
      >
        Подзаголовок
      </button>
      <button
        className={cn(
          "tool-panel_item",
          currentBlockType === BlockType.cite && "tool-panel_item-active"
        )}
        onClick={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.cite);
        }}
      >
        Сноска
      </button>
      <button
        className={cn(
          "tool-panel_item",
          currentBlockType === BlockType.default && "tool-panel_item-active"
        )}
        onClick={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.default);
        }}
      >
        Простой
      </button>

      {Object.values(InlineStyle).map((code) => {
        const onClick = (e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault()
          toggleInlineStyle(code)
        }

        return (
          <button
            key={code}
            className={cn(
              'tool-panel_item',
              hasInlineStyle(code) && 'tool-panel_item-active'
            )}
            onClick={onClick}
          >
            {code}
          </button>
        )
      })}

      <button onClick={_addLink}>Add link</button>
      <button onClick={() => console.log(toHtml())}>Print</button>
    </div>
  )
}
