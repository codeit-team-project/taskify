import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'

import styles from './EditDashboard.module.scss'
import ColorPicker from '@/components/colorPicker/ColorPicker'

import { DashBoardType, DashBoardValueType } from '@/types/dashBoardType'
import { getDashBoardsDetail } from '@/api/dashboards/getDashboardsDetail'
import { editDashBoard } from '@/api/dashboards/editDashboards'

interface EditDashboardProps {
  dashBoardId: number
}

export default function EditDashboard({ dashBoardId }: EditDashboardProps) {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const { data } = useQuery<DashBoardType>({
    queryKey: ['dashBoardsDetail', dashBoardId],
    queryFn: () => getDashBoardsDetail(dashBoardId),
    enabled: !!dashBoardId,
  })

  const { mutate: updateDashBoard } = useMutation({
    mutationKey: ['updateDashBoard'],
    mutationFn: (data: DashBoardValueType) => editDashBoard(dashBoardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardsDetail', dashBoardId] })
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] })
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
