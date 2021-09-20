import firebase from 'firebase'
import { fbConfig } from './fbConfig'

const app = firebase.initializeApp(fbConfig)

export const db = app.firestore()
export const auth = firebase.auth()
