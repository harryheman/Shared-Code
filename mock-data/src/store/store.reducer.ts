import { combineReducers } from 'redux'

import { studentsModuleReducer } from '../modules/Students'

export const storeReducer = combineReducers({
  students: studentsModuleReducer
})
