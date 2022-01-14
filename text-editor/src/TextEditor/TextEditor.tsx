import { Editor } from 'draft-js'
import { useEditorApi } from './context'
import cn from 'classnames'
import './styles/TextEditor.scss'
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from './config'

export type TextEditorProps = {
  className?: string
}

export const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const { state, onChange, keyCommand, keyBinding } = useEditorApi()

  return (
    <div className={cn('text-editor', className)}>
      <Editor
        spellCheck
        editorState={state}
        placeholder='text'
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
        handleKeyCommand={keyCommand}
        keyBindingFn={keyBinding}
      />
    </div>
  )
}
