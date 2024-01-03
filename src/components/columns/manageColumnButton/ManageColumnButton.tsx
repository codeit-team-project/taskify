import { useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './ManageColumnButton.module.scss'
import Image from 'next/image'
import ModalContainer from '@/components/dashboardModal/ModalContainer'
import ManageColumnModal from '../columnModal/ManageColumnModal'

interface ManageColumnButtonProps {
  originalTitle: string
  dashBoardId: number
  columnId: number
}

export default function ManageColumnButton({
  originalTitle,
  dashBoardId,
  columnId,
}: ManageColumnButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <button className={styles['button-setting-wrapper']} onClick={handleOpenModal}>
        <Image src="/assets/settingIcon.svg" alt="setting icon" width={24} height={24} />
      </button>
      {isOpenModal &&
        createPortal(
          <ModalContainer onClose={handleCloseModal}>
            <ManageColumnModal
              originalTitle={originalTitle}
              columnId={columnId}
              dashBoardId={dashBoardId}
              onClose={handleCloseModal}
            />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  )
}
