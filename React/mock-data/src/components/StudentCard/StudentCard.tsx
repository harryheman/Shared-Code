import { FC } from 'react'
import styles from './StudentCard.module.scss'
import { IStudent } from './StudentCard.types'

export const StudentCard: FC<IStudent> = (props) => {
  const { firstName, lastName, age, city, company, email, phone, avatar } =
    props

  return (
    <article className={styles.studentCard}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt='' />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          {firstName} {lastName}
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>City:</div>
          <div className={styles.infoValue}>{city}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Company:</div>
          <div className={styles.infoValue}>{company}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Age:</div>
          <div className={styles.infoValue}>{age} y/o</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Email:</div>
          <div className={styles.infoValue}>{email}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Phone number:</div>
          <div className={styles.infoValue}>{phone}</div>
        </div>
      </div>
    </article>
  )
}
