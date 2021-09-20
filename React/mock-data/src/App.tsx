import { useEffect } from 'react'

import styles from './App.module.scss'
import 'sanitize.css'
import { ContentWrapper } from './components/ContentWrapper'
import { useDispatch } from 'react-redux'
import { getStudentsAction } from './modules/Students'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentsAction())
  })

  return (
    <div className={styles.App}>
      <ContentWrapper />
    </div>
  )
}

export default App
