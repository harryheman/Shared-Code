import { factory } from '@mswjs/data'

import { StudentModel } from './models'

export const db = factory({
  student: StudentModel
})
