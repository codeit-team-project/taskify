import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import classNames from 'classnames'
import styles from './NewDashboardModal.module.scss'
import { createDashBoard } from '@/api/dashboards/createDashboards'
import { DEFAULT_COLOR } from '@/components/colorPicker/dashBoardColorPalette'
import ColorPicker from '@/components/colorPicker/ColorPicker'

interface NewDashboardModalProps {
  onClose: () => void
}

export default function NewDashboardModal({ onClose }: NewDashboardModalProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR)

  const { mutate } = useMutation({
    mutationKey: ['createDashboard'],
    mutationFn: createDashBoard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] })
      router.push(`/dashboard/${data.id}`)
      onClose()
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleCreateDashboard = () => {
    if (!title || !selectedColor) {
      return
    }

    mutate({
      title,
      color: selectedColor,
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새로운 대시보드</h2>
      <div className={styles.contents}>
        <p className={styles.description}>대시보드 이름</p>
        <input className={styles.input} onChange={handleChangeInput} value={title} />
      </div>
      <ColorPicker handleChangeColor={handleChangeColor} selectedColor={selectedColor} />
      <div className={styles.buttons}>
        <button className={styles['default-button']} onClick={() => onClose()}>
          취소
        </button>
        <button
          className={classNames(styles['primary-button'], {
            [styles.inActive]: !title || !selectedColor,
          })}
          onClick={handleCreateDashboard}
        >
          생성
        </button>
      </div>
    </div>
  )
}
