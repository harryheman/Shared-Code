import { nanoid } from 'nanoid'
import {
  SET_LOADING,
  SET_ERROR,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  OPEN_NOTE,
  CLOSE_NOTE,
  SET_RANDOM_COLOR
} from './types'

const handlers = {
  [SET_LOADING](state, action) {
    return {
      ...state,
      loading: action.value
    }
  },
  [SET_ERROR](state, action) {
    return {
      ...state,
      error: action.error
    }
  },
  [SET_NOTES](state, action) {
    return {
      ...state,
      notes: { ...state.notes, ...action.notes }
    }
  },
  [ADD_NOTE](state, action) {
    const id = nanoid(5)
    return {
      ...state,
      notes: {
        ...state.notes,
        [id]: { id, content: action.content }
      }
    }
  },
  [UPDATE_NOTE](state, action) {
    const { id, content } = action
    const updatedNote = {
      ...state.notes[id],
      content
    }
    return {
      ...state,
      notes: {
        ...state.notes,
        [id]: updatedNote
      }
    }
  },
  [REMOVE_NOTE](state, action) {
    const newNotes = Object.keys(state.notes).reduce((obj, key) => {
      if (key !== action.id) {
        obj[key] = state.notes[key]
      }
      return obj
    }, {})
    return {
      ...state,
      notes: newNotes
    }
  },
  [OPEN_NOTE](state, action) {
    return {
      ...state,
      openNoteId: action.id
    }
  },
  [CLOSE_NOTE](state, action) {
    return {
      ...state,
      openNoteId: null
    }
  },
  [SET_RANDOM_COLOR](state, action) {
    return {
      ...state,
      randomColor: action.randomColor
    }
  },
  '@@redux/INIT': (state) => state
}

const initialState = {
  notes: {},
  openNoteId: null,
  loading: false,
  error: null,
  randomColor: '#f0f0f0'
}

const reducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer
