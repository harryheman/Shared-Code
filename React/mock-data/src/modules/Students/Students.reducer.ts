import { Reducer } from 'redux'

import { IStudentsState } from './Students.types'
import { SET_STUDENTS } from './Students.constants'

const initialState: IStudentsState = {
  data: []
}
export const studentsModuleReducer: Reducer<IStudentsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_STUDENTS: {
      return {
        ...state,
        data: action.payload.students
      }
    }

    default:
      return state
  }
}
