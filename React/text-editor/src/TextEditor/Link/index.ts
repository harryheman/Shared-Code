import { Link } from './Link'
import { EntityType } from '../config'
import { ContentBlock, ContentState, DraftDecorator } from 'draft-js'

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
): void {
  contentBlock.findEntityRanges((char) => {
    const entityKey = char.getEntity()

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === EntityType.link
    )
  }, callback)
}

export const LinkDecorator: DraftDecorator = {
  strategy: findLinkEntities,
  component: Link
}
