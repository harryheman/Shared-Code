import {
  CompositeDecorator,
  DraftEntityMutability,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils
} from 'draft-js'
import { useCallback, useMemo, useState } from 'react'
import { BlockType, EntityType, InlineStyle, KeyCommand } from './config'
import { HTMLToState, stateToHTML } from './convert'
import { LinkDecorator } from './Link'

const decorator = new CompositeDecorator([LinkDecorator])

export type EditorApi = {
  state: EditorState
  onChange: (state: EditorState) => void
  toggleBlockType: (blockType: BlockType) => void
  currentBlockType: BlockType
  toggleInlineStyle: (inlineStyle: InlineStyle) => void
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean
  addLink: (url: string) => void
  setEntityData: (entityKey: string, data: Record<string, string>) => void
  keyCommand: (
    command: KeyCommand,
    editorState: EditorState
  ) => DraftHandleValue
  keyBinding: (e: React.KeyboardEvent) => KeyCommand | null
  toHtml: () => string
}

export const useEditor = (html?: string): EditorApi => {
  const [state, setState] = useState(() =>
    html
      ? EditorState.createWithContent(HTMLToState(html), decorator)
      : EditorState.createEmpty(decorator)
  )

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((state) => RichUtils.toggleBlockType(state, blockType))
  }, [])

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((state) => RichUtils.toggleInlineStyle(state, inlineStyle))
  }, [])

  const hasInlineStyle = useCallback(
    (inlineStyle: InlineStyle) => {
      const currentStyle = state.getCurrentInlineStyle()

      return currentStyle.has(inlineStyle)
    },
    [state]
  )

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection()
    const content = state.getCurrentContent()
    const block = content.getBlockForKey(selection.getStartKey())

    return block.getType() as BlockType
  }, [state])

  const addEntity = useCallback(
    (
      entityType: EntityType,
      data: Record<string, string>,
      mutability: DraftEntityMutability
    ) => {
      setState((state) => {
        const content = state.getCurrentContent()
        const contentWithEntity = content.createEntity(
          entityType,
          mutability,
          data
        )
        const entityKey = contentWithEntity.getLastCreatedEntityKey()
        const newState = EditorState.set(state, {
          currentContent: contentWithEntity
        })

        return RichUtils.toggleLink(
          newState,
          newState.getSelection(),
          entityKey
        )
      })
    },
    []
  )

  const addLink = useCallback(
    (url) => {
      addEntity(EntityType.link, { url }, 'MUTABLE')
    },
    [addEntity]
  )

  const setEntityData = useCallback((entityKey, data) => {
    setState((state) => {
      const content = state.getCurrentContent()
      const contentStateUpdated = content.mergeEntityData(entityKey, data)

      return EditorState.push(state, contentStateUpdated, 'apply-entity')
    })
  }, [])

  const keyCommand = useCallback(
    (command: KeyCommand, editorState: EditorState) => {
      if (command === 'accent') {
        toggleInlineStyle(InlineStyle.ACCENT)
        return 'handled'
      }

      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        setState(newState)
        return 'handled'
      }

      return 'not-handled'
    },
    // eslint-disable-next-line
    []
  )

  const keyBinding = useCallback((e: React.KeyboardEvent) => {
    if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'accent'
    }

    return getDefaultKeyBinding(e)
  }, [])

  const toHtml = useCallback(
    () => stateToHTML(state.getCurrentContent()),
    [state]
  )

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      addLink,
      setEntityData,
      keyCommand,
      keyBinding,
      toHtml
    }),
    [
      state,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      addLink,
      setEntityData,
      keyCommand,
      keyBinding,
      toHtml
    ]
  )
}
