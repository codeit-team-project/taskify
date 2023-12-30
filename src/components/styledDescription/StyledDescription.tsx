/*home 페이지 하단에 들어갈 styled div 컴포넌트

- children으로 Image를 받음
- title, description을 인자로 받음
*/
import { ReactNode } from 'react'
import styles from './StyledDescription.module.scss'

interface StyledDescriptionProps {
  children: ReactNode
  title: string
  description: string
}

export default function StyledDescription({
  title,
  description,
  children,
}: StyledDescriptionProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles['img-container']}>{children}</div>
      <div className={styles['description-container']}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
