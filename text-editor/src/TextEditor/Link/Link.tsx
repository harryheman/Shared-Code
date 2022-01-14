import { ContentState } from 'draft-js'
import { useEditorApi } from '../context'

type LinkProps = {
  contentState: ContentState
  entityKey: string
}

export const Link: React.FC<LinkProps> = ({
  contentState,
  entityKey,
  children
}) => {
  const { setEntityData } = useEditorApi()
  const { url, className } = contentState.getEntity(entityKey).getData()

  const click = () => {
    const newUrl = prompt('URL:', url)
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl })
    }
  }

  return (
    <a href={url} onDoubleClick={click} className={className}>
      {children}
    </a>
  )
}
