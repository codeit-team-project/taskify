import React, { useContext, useEffect, useState } from 'react'
import styles from '@/components/modalInput/Tags.module.scss'
import { KeyboardEvent } from 'react'
import { FormContext } from '@/context/formContext'

interface TagsProps {
  EditTags?: Array<string>
}

export default function Tags({ EditTags = [] }: TagsProps) {
  const { tags, setTags } = useContext(FormContext)
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const colorArr = ['orange', 'blue', 'green', 'pink']

  const handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentInputValue = e.currentTarget.value
    if (e.key === 'Enter' && currentInputValue !== '') {
      const randomNum = Math.floor(Math.random() * 4)
      const newTag = currentInputValue + '$' + colorArr[randomNum]
      const isDuplicated = tags.some((tag) => tag.split('$')[0] === currentInputValue)
      if (isDuplicated) {
        setTags((prev: string[]) => prev.filter((tag) => tag.split('$')[0] !== currentInputValue))
      }
      setTags((prev: string[]) => [...prev, newTag])
      setInputValue('')
    }
  }

  const handleDelete = (deleteIndex: number) => {
    setTags(tags.filter((_, index) => index !== deleteIndex))
  }  
  useEffect(() => {
    if (EditTags.length > 0) {
      setTags(EditTags)
    }
  }, [])
  return (
    <div className={styles.container}>
      <span className={styles.text}>태그</span>
      <div className={styles.contents}>
        <ul>
          {tags.length > 0 &&
            tags.map((tag, index) => {
              const [tagName, color] = tag.split('$')
              return (
                <li key={tagName} className={`${styles.tag} ${color ? styles[color] : ''}`}>
                  {tagName}
                  <span onClick={() => handleDelete(index)}>x</span>
                </li>
              )
            })}
        </ul>
        <input
          onKeyUp={handleAdd}
          onChange={handleChange}
          placeholder={`${tags.length > 0 ? '' : '입력 후 Enter'}`}
          value={inputValue}
        />
      </div>
    </div>
  )
}
