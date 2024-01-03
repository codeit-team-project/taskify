import { useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './AddColumnButton.module.scss'
import ModalContainer from '@/components/dashboardModal/ModalContainer'
import CreateColumnModal from '@/components/columns/columnModal/CreateColumnModal'

interface AddColumnButtonProps {
  dashBoardId: number
}

export default function AddColumnButton({ dashBoardId }: AddColumnButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <li className={styles['button-container']}>
        <button onClick={handleOpenModal}>
          <p className={styles['button-text']}>새로운 컬럼 추가하기</p>
          <img src="/assets/icon-add-purple.png" width={24} height={24} alt="추가 버튼 이미지" />
        </button>
      </li>
      {isOpenModal &&
        createPortal(
          <ModalContainer onClose={handleCloseModal}>
            <CreateColumnModal dashBoardId={dashBoardId} onClose={handleCloseModal} />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  )
}
