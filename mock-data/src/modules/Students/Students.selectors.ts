import { Selector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { IStudentsState } from './Students.types'
import { IStoreState } from '../../store/store.types'
import { IStudent } from '../../components/StudentCard'

export const studentsState: Selector<IStoreState, IStudentsState> = (state) =>
  state.students

export const getStudentsSelector = createSelector<
  IStoreState,
  IStudentsState,
  IStudent[]
>([studentsState], ({ data }) => data)
