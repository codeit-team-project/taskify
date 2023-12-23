import React, { useState } from 'react'
import styles from '@/components/modalInput/Manager.module.scss'
import Image from 'next/image'
import arrowDown from '../../../public/assets/arrowDown.svg'
export default function Manager({ data }) {
  const [manager, setManager] = useState('yuna')
  const [profileImage, setProfileImage] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.container}>
      <span className={styles.text}>담당자</span>
      <div onClick={handleOpenClick} className={styles.dropdownbutton}>
        {/* <img src={profileImage} alt="profile-image" className={styles.profileImage} /> */}
        {manager}
        <Image src={arrowDown} alt="arrowdown" />
        {isOpen && (
          <div className={styles.dropdown}>
            <ul>
              {data.map((person) => (
                <li
                  key={person.userId}
                  onClick={() => {
                    setManager(person.nickname)
                    setProfileImage(person.profileImageUrl)
                    setIsOpen(!isOpen)
                  }}
                >
                  {person.profileImageUrl && (
                    <img
                      src={person.profileImageUrl}
                      alt="profileImage"
                      className={styles.profileImage}
                    />
                  )}
                  {person.nickname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
