import { FC } from 'react'
import styles from './ContentWrapper.module.scss'
import { StudentsList } from '../StudentsList'

export const ContentWrapper: FC = () => (
  <main className={styles.contentWrapper}>
    <h1 className={styles.contentHeader}>Our students</h1>
    <div className={styles.contentSubHeader}>
      (generated with <a href='https://mswjs.io/'> Mock Service Worker </a> and{' '}
      <a href='https://www.npmjs.com/package/faker'> Faker.js</a>)
    </div>

    <StudentsList />
  </main>
)
