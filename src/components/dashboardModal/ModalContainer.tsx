import { MouseEvent, ReactNode } from 'react'
import styles from './ModalContainer.module.scss'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

export default function ModalContainer({ onClose, children }: ModalProps) {
  const handleOutSideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <section onClick={handleOutSideClick} className={styles.container}>
      {children}
    </section>
  )
}
