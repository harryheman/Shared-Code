import { GET_STUDENTS, SET_STUDENTS } from './Students.constants'
import { IStudent } from '../../components/StudentCard/StudentCard.types'

export interface IGetStudentsAction {
  type: typeof GET_STUDENTS
}

export interface ISetStudentsAction {
  type: typeof SET_STUDENTS
  payload: IStudent[]
}

export interface IStudentsState {
  data: IStudent[]
}
