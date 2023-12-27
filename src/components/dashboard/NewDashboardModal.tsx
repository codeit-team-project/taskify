/**
 * @TODO
 * 사이드바 "+" 클릭시 대시보드 생성 모달 나타남
 * /mydashboard 페이지에서 새로운 대시보드 "+" 클릭시 대시보드 생성 모달 나타남
 * color palette 이벤트 핸들러 (리팩토링)
 */
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import classNames from 'classnames'
import styles from './NewDashboardModal.module.scss'
import { createDashBoard } from '@/api/dashboards/createDashboards'
import { COLOR_PALETTE, DEFAULT_COLOR } from '@/components/colorPicker/dashBoardColorPalette'

import EllipseIcon from '@/components/ui/icons/Ellipse'

interface NewDashboardModalProps {
  onClose: () => void
}

export default function NewDashboardModal({ onClose }: NewDashboardModalProps) {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR)

  const { mutate } = useMutation({
    mutationKey: ['createDashboard'],
    mutationFn: createDashBoard,
    onSuccess: (data) => {
      router.push(`/dashboard/${data.id}`)
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeColor = (color: string) => () => {
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
      <div className={styles.colors}>
        {COLOR_PALETTE.map((palette) => (
          <div
            key={palette.color}
            onClick={handleChangeColor(palette.hexCode)}
            className={styles.color}
          >
            {selectedColor === palette.hexCode && (
              <img src="/assets/checkIcon.svg" className={styles.check} />
            )}
            <EllipseIcon size={30} color={palette.hexCode} />
          </div>
        ))}
      </div>
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
