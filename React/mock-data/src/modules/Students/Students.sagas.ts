import { call, put, takeLatest } from 'redux-saga/effects'

import { GET_STUDENTS } from './Students.constants'
import { STUDENTS_LIST_ROUTE_MASK } from '../../mocks/mocks.constants'
import { sendStudentsRequest } from '../../api/sendRequest'
import { IStudent } from '../../components/StudentCard/StudentCard.types'
import { setStudentsAction } from './Students.actions'

export function* getStudents() {
  try {
    const students: IStudent[] = yield call(sendStudentsRequest, {
      url: STUDENTS_LIST_ROUTE_MASK
    })

    yield put(setStudentsAction(students))
  } catch (error) {
    console.log(error)
  }
}

export const sagaStudentsModule = [takeLatest(GET_STUDENTS, getStudents)]
