import React, { ReactNode } from 'react'
import styles from '@/components/modalButton/ModalButton.module.scss'

interface ModalButtonProps {
  children: ReactNode
  color: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ModalButton({ children, color, ...props }: ModalButtonProps) {
  const containerClassName = `${styles.container} ${styles[color]}`
  return (
    <button className={containerClassName} onClick={props.onClick}>
      {children}
    </button>
  )
}
