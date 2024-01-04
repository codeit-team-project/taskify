import React, { ReactNode } from 'react'
import styles from '@/components/modalButton/ModalButton.module.scss'

interface ModalButtonProps {
  children: ReactNode
  color: string
  size?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ModalButton({ children, color, size, ...props }: ModalButtonProps) {
  const containerClassName = `${styles.container} ${styles[color]} ${size ? styles[size] : ''} ${
    props.disabled ? '' : styles.active
  }`

  return (
    <button className={containerClassName} onClick={props.onClick} disabled={props.disabled}>
      {children}
    </button>
  )
}
