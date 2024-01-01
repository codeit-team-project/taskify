import Image from 'next/image'
import styles from './ColumnTitle.module.scss'

interface ColumnTitleProps {
  title: string
  number: number
}

export default function ColumnTitle({ title, number }: ColumnTitleProps) {
  return (
    <div className={styles['column-title-container']}>
      <div className={styles['dot']}></div>
      <p className={styles['title']}>{title}</p>
      <p className={styles['number']}>{number}</p>
      <button className={styles['button-setting-wrapper']}>
        <Image src="/assets/settingIcon.svg" alt="setting icon" width={24} height={24} />
      </button>
    </div>
  )
}
