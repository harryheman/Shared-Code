import { createContext, useContext } from 'react'
import { EditorApi, useEditor } from './useEditor'

const TextEditorContext = createContext<EditorApi | undefined>(undefined)

export const useEditorApi = () => {
  const context = useContext(TextEditorContext)
  if (context === undefined) {
    throw new Error('error')
  }

  return context
}

export const TextEditorProvider: React.FC = ({ children }) => {
  const editorApi = useEditor()

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  )
}
