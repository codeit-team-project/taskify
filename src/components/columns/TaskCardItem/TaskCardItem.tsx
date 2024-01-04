import { CardType } from '@/types/cardsType'
import styles from './TaskCardItem.module.scss'
import tagStyles from '@/components/modalInput/Tags.module.scss'
import { selectColor } from '@/components/randomProfile/RandomProfile'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import ModalContent from '@/components/modalContent/ModalContent'
import ReadTodo from '@/data-access/readTodo/ReadTodo'
import FormProvider from '@/context/formContext'
import { createPortal } from 'react-dom'
import { fnsTimeFormat } from '@/utils/mappingTime'

interface TaskCardItemProps {
  item: CardType
  dashBoardId: number
  columnId: number
}


export default function TaskCardItem({ item, dashBoardId, columnId }: TaskCardItemProps) {
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <li className={styles['task-card-container']} key={item.id} onClick={handleOpenModal}>
        {
          <img
            className={styles['task-img']}
            src={item.imageUrl}
            width={24}
            height={24}
            alt="추가 버튼 이미지"
          />
        }
        <p className={styles['task-title']}>{item.title}</p>
        <ul className={styles['tag-list']}>
          {item.tags.map((tag) => {
            const [tagName, color] = tag.split('$')
            return (
              <li key={tagName} className={`${styles['tag']} ${color ? tagStyles[color] : ''}`}>
                {tagName}
              </li>
            )
          })}
        </ul>
        <div className={styles['info']}>
          <img
            className={styles['icon-calender']}
            src="/assets/icon-calendar.png"
            width={18}
            height={18}
            alt="달력 아이콘"
          />
          <p className={styles['date']}>{fnsTimeFormat(item.dueDate).substring(0, 10).replace(/-/g, ".")}</p>
          <div className={styles['icon-user-wrapper']}>
            {item?.assignee?.profileImageUrl ? (
              <img className={styles['icon-profile']} src={item.assignee.profileImageUrl} width={24} height={24} />
            ) : (
              <div
                className={styles['no-profile']}
                style={{
                  backgroundColor: selectColor(item?.assignee.nickname[0].toUpperCase()),
                }}
              >
                {item?.assignee.nickname[0].toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </li>
      {isOpenModal &&
        createPortal(
          <ModalContent>
            <FormProvider>
              <ReadTodo
                refetchColumnList={(id: number) => {
                  queryClient.invalidateQueries({
                    queryKey: ['getCards', id],
                  })
                  if (id !== columnId) {
                    queryClient.invalidateQueries({
                      queryKey: ['getCards', columnId],
                    })
                  }
                }}
                cardId={item.id}
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
