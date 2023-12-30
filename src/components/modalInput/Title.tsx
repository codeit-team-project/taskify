import React, { useContext, useEffect } from 'react'
import styles from '@/components/modalInput/Title.module.scss'
import { FormContext } from '@/context/formContext'

export default function Title({ EditTitle = '' }) {
  const { title, setTitle } = useContext(FormContext)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  useEffect(() => {
    if (EditTitle.length > 0) {
      setTitle(EditTitle)
    }
  }, [])

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
