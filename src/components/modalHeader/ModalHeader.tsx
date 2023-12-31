import styles from './ModalHeader.module.scss'
import Image from 'next/image'
import { CardType } from '@/types/cardsType'

interface ModalHeaderProps {
  cardDetailData: CardType
  columnName: string
}

export default function ModalHeader({ cardDetailData, columnName }: ModalHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.column__wrapper}>
        <div className={styles.circle}></div>
        <span className={styles.column}>{columnName}</span>
      </div>
      <Image src={'/assets/images/divider.svg'} alt="divider" width="20" height="20" />
      <ul className={styles.tag__wrapper}>
        {cardDetailData.tags.map((tag: string) => {
          const [tagName, color] = tag.split('$')
          return (
            <li key={tagName} className={`${styles.tag} ${color ? styles[color] : ''}`}>
              {tagName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
