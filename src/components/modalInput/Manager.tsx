import React, { useContext, useEffect, useState } from 'react'
import styles from '@/components/modalInput/Manager.module.scss'
import arrowDown from '../../../public/assets/images/arrowDown.svg'
import Image from 'next/image'
import { Members } from '@/types/members'
import { FormContext } from '@/context/formContext'
import RandomProfile from '../randomProfile/RandomProfile'

export type managerListType = Members[]

interface ManagerPropsType {
  managerId?: number
  editName?: string
  profileImageUrl?: string
  managerList: managerListType | undefined
}

export default function Manager({
  managerId = 0,
  editName = '',
  profileImageUrl = '',
  managerList = [],
}: ManagerPropsType) {
  const {
    profileImage,
    setProfileImage,
    assigneeUserName,
    setAssigneeUserName,
    setAssigneeUserId,
  } = useContext(FormContext)

  const [email, setEmail] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (managerId) {
      setAssigneeUserId(managerId)
    }
    if (editName.length > 0) {
      setAssigneeUserName(editName)
      setEmail(editName)
    }
    if (profileImageUrl && profileImageUrl.length > 0) {
      setProfileImage(profileImageUrl)
    }
  }, [])
  return (
    <div className={styles.container}>
      <span className={styles.text}>담당자</span>
      <div onClick={handleOpenClick} className={styles.dropdownbutton}>
        <div className={styles.assigneeUser__wrapper}>
          {profileImage ? (
            <div className={styles.assigneeUser__image}>
              <Image src={profileImage} alt="profile-image" width={30} height={30} />
            </div>
          ) : (
            <>{email && <RandomProfile size={20} email={email}></RandomProfile>}</>
          )}
          <span>{assigneeUserName}</span>
        </div>
        <Image src={arrowDown} alt="arrowdown" width={20} height={20} />
        {isOpen && (
          <div className={styles.dropdown}>
            <ul>
              {managerList?.map((person) => (
                <li
                  key={person.userId}
                  onClick={() => {
                    setAssigneeUserName(person.nickname)
                    setAssigneeUserId(person.userId)
                    setProfileImage(person.profileImageUrl)
                    setIsOpen(!isOpen)
                  }}
                >
                  <div className={styles.dropdown__assigneeUser__wrapper}>
                    {person.profileImageUrl ? (
                      <Image
                        src={person.profileImageUrl}
                        alt="profileImage"
                        className={styles.profileImage}
                        width={20}
                        height={20}
                      />
                    ) : (
                      <RandomProfile size={20} email={person.email}></RandomProfile>
                    )}
                    {person.nickname}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
