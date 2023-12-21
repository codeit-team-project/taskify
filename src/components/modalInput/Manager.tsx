import React, { useState } from 'react'
import styles from '@/components/modalInput/Manager.module.scss'
import Image from 'next/image'
import arrowDown from '../../../public/assets/arrowDown.svg'
export default function Manager() {
  const [manager, setManager] = useState('yuna')
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenClick = () => {
    setIsOpen(!isOpen)
  }

  const names = ['연아', '연아2', '연아3', '연아4']
  return (
    <div className={styles.container}>
      <span className={styles.text}>담당자</span>
      <div onClick={handleOpenClick} className={styles.dropdownbutton}>
        {manager}
        <Image src={arrowDown} alt="arrowdown" />
        {isOpen && (
          <div className={styles.dropdown}>
            <ul>
              {names.map((name, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setManager(name)
                    setIsOpen(!isOpen)
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
