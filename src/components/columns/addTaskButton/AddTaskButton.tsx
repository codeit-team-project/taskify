import FormProvider from '@/context/formContext'
import styles from './AddTaskButton.module.scss'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import ModalContent from '@/components/modalContent/ModalContent'
import CreateTodo from '@/data-access/createTodo/CreateTodo'
import { useQueryClient } from '@tanstack/react-query'

interface AddTaskButtonProps {
  dashBoardId: number
  columnId: number
}

export default function AddTaskButton({ dashBoardId, columnId }: AddTaskButtonProps) {
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      <button
        className={styles['add-task-button-container']}
        onClick={() => {
          setIsOpenModal(true)
        }}
      >
        <img src="/assets/icon-add-purple.png" width={24} height={24} alt="추가 버튼 이미지" />
      </button>

      {isOpenModal &&
        createPortal(
          <ModalContent>
            <FormProvider>
              <CreateTodo
                refetchColumnList={(id: number) => {
                  queryClient.invalidateQueries({
                    queryKey: ['getCards', id],
                  })
                }}
                dashboardId={dashBoardId}
                columnId={columnId}
                onClose={handleCloseModal}
              />
            </FormProvider>
          </ModalContent>,
          document.getElementById('modal-root')!,
        )}
    </>
  )
}
