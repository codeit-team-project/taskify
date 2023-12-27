/**
 * @todo
 * 해당 대시보드 기존 값이 default로 설정되어 있음 (완료)
 * 이름이나 색을 바꾸고 '변경' 버튼을 누르면 대시보드가 수정 (완료)
 * 컬러팔레트 svg 파일 말고 css로 작업 (완료)
 * 모바일 사이즈에서 컬러팔레트 선택된 것만 보이기
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
        <span className={styles.title}>대시보드 이름</span>
        <ColorPicker handleChangeColor={handleChangeColor} selectedColor={selectedColor} />
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
