import React, { useContext } from 'react'
import styles from '@/components/modalInput/DesCription.module.scss'
import { FormContext } from '@/context/formContext'

export default function DesCription() {
  const { description, setDescription } = useContext(FormContext)

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.text}>설명</span>
        <span className={styles.emphasis}>*</span>
      </div>
      <input
        type="textarea"
        className={styles.textarea}
        value={description}
        onChange={handleDescription}
      />
    </div>
  )
}
