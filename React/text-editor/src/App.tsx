import { TextEditorProvider } from './TextEditor/context'
import { TextEditor, ToolPanel } from './TextEditor'

function App() {
  return (
    <TextEditorProvider>
      <ToolPanel />
      <TextEditor />
    </TextEditorProvider>
  )
}

export default App
