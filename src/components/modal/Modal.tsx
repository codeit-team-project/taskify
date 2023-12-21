import React from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import CreateTodo from '@/ui/createTodo/CreateTodo'
import ModalContent from '@/components/modalContent/ModalContent'
import styles from '@/components/modal/Modal.module.scss'
import FormProvider from '@/context/formContext'

export default function Modal() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const containerClassName = `${styles.container} ${showModal ? styles['dark-background'] : ''}`

  return (
    <div className={containerClassName}>
      <button onClick={handleOpenModal}>모달을엽시다</button>
      {showModal &&
        createPortal(
          <ModalContent>
            <FormProvider>
              <CreateTodo onClose={handleCloseModal}></CreateTodo>
            </FormProvider>
          </ModalContent>,
          document.getElementById('modal-root')!,
        )}
    </div>
  )
}
