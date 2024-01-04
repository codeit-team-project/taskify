import React from 'react'
import styles from './ModalProfile.module.scss'
import { fnsTimeFormat } from '@/utils/mappingTime'
import Image from 'next/image'
import { CardType } from '@/types/cardsType'
import RandomProfile from '../randomProfile/RandomProfile'

interface ModalProfileProps {
  cardDetailData: CardType
}

export default function ModalProfile({ cardDetailData }: ModalProfileProps) {
  const manager = cardDetailData.assignee
  const time = fnsTimeFormat(cardDetailData.dueDate)
  return (
    <div className={styles.assingee__wrapper}>
      <div className={styles.assingee__profile__wrapper}>
        <span className={styles.assignee}>담당자</span>
        <div className={styles.profile}>
          {manager.profileImageUrl ? (
            <div className={styles.profileImage}>
              <Image src={manager.profileImageUrl} width="30" height="30" alt="image" />
            </div>
          ) : (
            <RandomProfile size={20} email={manager.nickname}></RandomProfile>
          )}
          <span>{manager.nickname}</span>
        </div>
      </div>
      <div className={styles.deadline}>
        <span className={styles.deadline__date}>마감일</span>
        {time}
      </div>
    </div>
  )
}
