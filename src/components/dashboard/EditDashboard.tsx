/**
 * @todo
 * 수정후에 사이드바, 네브바 대시보드 이름 변경 확인하기
 * 에러케이스 확인하기
 */

import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'

import styles from './EditDashboard.module.scss'
import ColorPicker from '@/components/colorPicker/ColorPicker'

import { DashBoardType, DashBoardVauleType } from '@/types/dashBoardType'
import { getDashBoardsDetail } from '@/api/dashboards/getDashboardsDetail'
import { editDashBoard } from '@/api/dashboards/editDashboards'

interface EditDashboardProps {
  boardId: number
}

export default function EditDashboard({ boardId }: EditDashboardProps) {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const { data } = useQuery<DashBoardType>({
    queryKey: ['dashBoardsDetail', boardId],
    queryFn: () => getDashBoardsDetail(boardId),
  })

  const { mutate: updateDashBoard } = useMutation({
    mutationKey: ['updateDashBoard'],
    mutationFn: (data: DashBoardVauleType) => editDashBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardsDetail', boardId] })
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleUpdateDashboard = () => {
    if (!title || !selectedColor) {
      return
    }

    if (data?.color === selectedColor && data?.title === title) {
      return
    }

    updateDashBoard({
      title,
      color: selectedColor,
    })
  }

  useEffect(() => {
    if (data) {
      setSelectedColor(data.color)
      setTitle(data.title)
    }
  }, [data])

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <span className={styles.title}>{data?.title}</span>
        <ColorPicker
          handleChangeColor={handleChangeColor}
          selectedColor={selectedColor}
          isVisibleAllColors={false}
        />
      </div>
      <div className={styles.contents}>
        <p className={styles.description}>대시보드 이름</p>
        <input className={styles.input} onChange={handleChangeInput} defaultValue={data?.title} />
      </div>
      <div className={styles.button}>
        <button
          className={classNames(styles['primary-button'], {
            [styles.inActive]: !title || !selectedColor,
          })}
          onClick={handleUpdateDashboard}
        >
          변경
        </button>
      </div>
    </section>
  )
}
