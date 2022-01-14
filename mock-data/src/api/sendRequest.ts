import { IStudent } from '../components/StudentCard/StudentCard.types'

export type TSendStudentsRequestPayload = {
  url: string
}

export const sendStudentsRequest = async (
  payload: TSendStudentsRequestPayload
): Promise<IStudent[]> => {
  try {
    const response = await fetch(payload.url)

    let students = []

    if (response.ok) {
      students = await response.json()
    }

    return students
  } catch (e: any) {
    console.log('[sendRequest] ERROR :', e)
    return e
  }
}
