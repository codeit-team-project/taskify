import React, { useContext, useEffect } from 'react'
import styles from '@/components/modalInput/DesCription.module.scss'
import { FormContext } from '@/context/formContext'

export default function DesCription({ EditDesScription = '' }) {
  const { description, setDescription } = useContext(FormContext)

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }
  useEffect(() => {
    if (EditDesScription.length > 0) {
      setDescription(EditDesScription)
    }
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.text}>설명</span>
      </div>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={handleDescription}
        placeholder="설명을 입력해주세요"
      />
    </div>
  )
}
