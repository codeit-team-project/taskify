import React, { useContext } from 'react'
import styles from '@/components/modalInput/Title.module.scss'
import { FormContext } from '@/context/formContext'

export default function Title() {
  const { title, setTitle } = useContext(FormContext)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.text}>제목</span>
        <span className={styles.emphasis}>*</span>
      </div>
      <input className={styles.input} value={title} onChange={handleTitle} />
    </div>
  )
}
