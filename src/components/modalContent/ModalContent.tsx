import React from 'react'
import styles from '@/components/modalContent/ModalContent.module.scss'

interface ModalContentProps {
  children: React.ReactNode
  onClose?: Function
}
export default function ModalContent({ children }: ModalContentProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
