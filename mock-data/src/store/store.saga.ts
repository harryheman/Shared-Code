import { all, AllEffect } from 'redux-saga/effects'
import { sagaStudentsModule } from '../modules/Students'

export default function* rootSaga(): Generator<AllEffect<any>> {
  yield all([...sagaStudentsModule])
}
