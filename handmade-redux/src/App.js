import { useState } from 'react'
import connect from './scripts/redux'
import {
  ASYNC,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  OPEN_NOTE,
  CLOSE_NOTE
} from './scripts/redux/types'
import { api } from './scripts/api'

const NoteEditor = ({ note, onChangeNote, onCloseNote }) => (
  <div>
    <input
      type='text'
      autoFocus
      value={note.content}
      onChange={({ target: { value } }) => onChangeNote(note.id, value)}
    />
    <button onClick={onCloseNote}>Close</button>
  </div>
)

const NoteTitle = ({ note }) => {
  const title = note.content
  if (!title) return <i>Untitled</i>
  return <b>{title}</b>
}

const NoteLink = ({ note, onOpenNote, onRemoveNote }) => (
  <li className='note-list-item'>
    <span onClick={() => onOpenNote(note.id)}>
      <NoteTitle note={note} />
    </span>
    <button onClick={() => onRemoveNote(note.id)}>Remove</button>
  </li>
)

const NoteList = ({ notes, onOpenNote, onRemoveNote }) => (
  <ul>
    {Object.keys(notes).map((id) => (
      <NoteLink
        key={id}
        note={notes[id]}
        onOpenNote={onOpenNote}
        onRemoveNote={onRemoveNote}
      />
    ))}
  </ul>
)

const NoteForm = ({ onAddNote }) => {
  const [content, setContent] = useState('')
  const onChange = ({ target: { value } }) => setContent(value)
  const onSubmit = (e) => {
    e.preventDefault()
    onAddNote(content)
    setContent('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={content} onChange={onChange} />
      <button>New Note</button>
    </form>
  )
}

const NoteApp = ({
  loading,
  notes,
  openNoteId,
  onGetNotes,
  onAddNote,
  onChangeNote,
  onRemoveNote,
  onOpenNote,
  onCloseNote
}) => {
  // console.log('NoteApp render')

  return (
    <div>
      {openNoteId ? (
        <NoteEditor
          note={notes[openNoteId]}
          onChangeNote={onChangeNote}
          onCloseNote={onCloseNote}
        />
      ) : (
        <div>
          <NoteList
            notes={notes}
            onOpenNote={onOpenNote}
            onRemoveNote={onRemoveNote}
          />
          <NoteForm onAddNote={onAddNote} />
          <button className='get-button' onClick={onGetNotes}>
            {loading ? 'Loading...' : 'Get Notes'}
          </button>
        </div>
      )}
    </div>
  )
}

const stateKeysToMap = ['loading', 'notes', 'openNoteId']
const methodsToMap = {
  onAddNote: (content) => ({
    type: ADD_NOTE,
    content
  }),
  onChangeNote: (id, content) => ({
    type: UPDATE_NOTE,
    id,
    content
  }),
  onRemoveNote: (id) => ({
    type: REMOVE_NOTE,
    id
  }),
  onOpenNote: (id) => ({
    type: OPEN_NOTE,
    id
  }),
  onCloseNote: () => ({
    type: CLOSE_NOTE
  }),
  onGetNotes: () => ({
    type: ASYNC,
    fetcher: api.fetchNotes,
    onResult: (notes) => ({
      type: SET_NOTES,
      notes
    })
  })
}

export default connect(stateKeysToMap, methodsToMap)(NoteApp)
