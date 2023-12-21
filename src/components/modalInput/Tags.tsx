import React, { useContext } from 'react'
import styles from '@/components/modalInput/Tags.module.scss'
import { KeyboardEvent } from 'react'
import { FormContext } from '@/context/formContext'

export default function Tags() {
  const { tags, setTags } = useContext(FormContext)

  const handleTags = () => {
    setTags(tags)
  }

  const handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    if (e.key === 'Enter' && inputValue !== '' && !tags.includes(inputValue)) {
      setTags([...tags, inputValue])
      e.currentTarget.value = ''
    }
  }

  const handleDelete = (deleteIndex: number) => {
    setTags(tags.filter((_, index) => index !== deleteIndex))
  }

  return (
    <div className={styles.container}>
      <span className={styles.text}>태그</span>
      <div className={styles.contents}>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <span>{tag}</span>
              <span onClick={() => handleDelete(index)}>x</span>
            </li>
          ))}
        </ul>
        <input onKeyDown={handleAdd} onChange={handleTags} />
      </div>
    </div>
  )
}
