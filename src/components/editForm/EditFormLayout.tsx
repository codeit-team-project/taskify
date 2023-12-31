import { ReactNode } from 'react'
import styles from './EditFormLayout.module.scss'

interface EditFormLayoutProps {
  children: ReactNode
  isEditing: boolean
  title: string
}

export default function EditFormLayout({ children, isEditing, title }: EditFormLayoutProps) {
  return (
    <div className={styles.container} data-isediting={isEditing}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  )
}
