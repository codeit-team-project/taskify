import React, { useEffect, useState } from 'react'
import styles from '@/data-access/readTodo/ReadTodo.module.scss'
import Image from 'next/image'
import close from '../../../public/assets/images/close.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCardDetail } from '../../api/cards/getCardDetail'
import { getColumns } from '@/api/columns/getColumns'
import kebab from '../../../public/assets/images/kebab.svg'
import useComponentVisible from '@/hooks/useComponentVisible'
import EditTodo from '../editTodo/EditTodo'
import { deleteCard } from '@/api/cards/deleteCard'
import ModalComment from '@/components/modalComment/ModalComment'
import ModalProfile from '@/components/modalProfile/ModalProfile'
import ModalHeader from '@/components/modalHeader/ModalHeader'

interface ReadTodoProps {
  cardId: number
  columnId: number
  dashboardId: number
  onClose: () => void
  refetchColumnList: (columnId: number) => void
}

export default function ReadTodo({
  refetchColumnList,
  dashboardId,
  columnId,
  cardId,
  onClose,
}: ReadTodoProps) {
  const [selectItem, setSelectedItem] = useState('')
  const [openDropdown, setOpenDropDown] = useState(false)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true)

  const queryClient = useQueryClient()
  const handleOpenDropdown = () => {
    setOpenDropDown(true)
    setIsComponentVisible(true)
  }

  // 카드 상세 내용 가져오기
  const { data, isSuccess } = useQuery({
    queryKey: ['detailCard', cardId],
    queryFn: () => getCardDetail(cardId),
  })

  // 컬럼 아이디 가져오기
  const columQuery = useQuery({
    queryKey: ['column', dashboardId],
    queryFn: () => getColumns(dashboardId),
  })

  // 카드 삭제 영역
  const cardDeleteMutation = useMutation({
    mutationFn: (commnetId: number) => deleteCard(commnetId),
  })

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ['detailCard', cardId] })
    }
  }, [])

  if (isSuccess && columQuery.isSuccess) {
    const columnList = columQuery.data.data!
    const targetColumn = columnList.filter((item) => item.id === data.columnId)
    const columnName = targetColumn[0]?.title

    // 카드삭제하기
    const handleDeleteCard = (cardId: number) => {
      if (window.confirm('정말삭제하시겠습니까?')) {
        cardDeleteMutation.mutate(cardId)
        refetchColumnList(columnId)
        onClose()
      } else {
        setSelectedItem('')
      }
    }
    const handleClick = (value: string, cardId: number) => {
      setSelectedItem(value)
      if (value === '삭제하기') {
        handleDeleteCard(cardId)
      }
      setOpenDropDown(false)
    }
    return (
      <>
        {selectItem === '수정하기' ? (
          <EditTodo
            dashboardId={dashboardId}
            cardId={cardId}
            columnId={columnId}
            setSelectedItem={setSelectedItem}
            targetColumn={columnName}
            columnList={columnList}
            onClose={onClose}
            refetchColumnList={refetchColumnList}
          />
        ) : (
          <div className={styles.container}>
            <div className={styles.header}>
              <span className={styles.title}>{data.title}</span>
              <div className={styles.image}>
                <Image
                  src={kebab}
                  alt="kebab"
                  onClick={handleOpenDropdown}
                  width={32}
                  height={32}
                />
                {openDropdown && isComponentVisible && (
                  <div className={styles.dropdown__container} ref={ref}>
                    <ul className={styles.dropdown__menus}>
                      {['수정하기', '삭제하기'].map((item, idx) => {
                        return (
                          <li
                            className={styles.dropdown__menu}
                            key={idx}
                            onClick={() => handleClick(item, cardId)}
                          >
                            {item}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                <Image src={close} alt="close" onClick={onClose} width={30} height={30} />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.contents}>
                <ModalHeader cardDetailData={data} columnName={columnName} />
                <div className={styles.description}>{data.description}</div>
                <div className={styles.contents__image}>
                  <Image src={data.imageUrl} fill alt="image" sizes="45rem" />
                </div>
                <ModalComment dashboardId={dashboardId} columnId={columnId} cardId={cardId} />
              </div>
              <ModalProfile cardDetailData={data} />
            </div>
          </div>
        )}
      </>
    )
  }
}
