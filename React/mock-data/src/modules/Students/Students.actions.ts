import { ActionCreator } from 'redux'
import { GET_STUDENTS, SET_STUDENTS } from './Students.constants'
import { IGetStudentsAction, ISetStudentsAction } from './Students.types'
import { IStudent } from '../../components/StudentCard'

export const getStudentsAction: ActionCreator<IGetStudentsAction> = () => ({
  type: GET_STUDENTS
})

export const setStudentsAction: ActionCreator<ISetStudentsAction> = (
  payload: IStudent[]
) => ({
  type: SET_STUDENTS,
  payload
})
