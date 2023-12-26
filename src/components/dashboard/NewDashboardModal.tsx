/**
 * @TODO
 * 사이드바 "+" 클릭시 대시보드 생성 모달 나타남
 * /mydashboard 페이지에서 새로운 대시보드 "+" 클릭시 대시보드 생성 모달 나타남
 * 모달에서 대시보드 이름과 색을 선택해야 '생성' 버튼이 활성화
 * '생성'버튼을 누르면 대시보드가 생성이 되고 해당 대시보드 상세/boardid로 이동
 */

import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import classNames from 'classnames'
import styles from './NewDashboardModal.module.scss'
import { createDashBoard } from '@/api/dashboards/createDashboards'
import { COLOR_PALETTE } from '@/utils/dashBoardColorPalette'

import EllipseIcon from '@/components/ui/icons/Ellipse'

interface NewDashboardModalProps {
  onClose: () => void
}

export default function NewDashboardModal({ onClose }: NewDashboardModalProps) {
  const [title, setTitle] = useState('')

  const { mutate } = useMutation({
    mutationKey: ['createDashboard'],
    mutationFn: createDashBoard,
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCreateDashboard = () => {
    console.log(title)

    // mutate({
    //   title,
    //   color: '#ffffff',
    // })
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
          <EllipseIcon key={palette.color} size={30} color={palette.hexCode} />
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles['default-button']} onClick={() => onClose()}>
          취소
        </button>
        <button className={classNames(styles['primary-button'])} onClick={handleCreateDashboard}>
          생성
        </button>
      </div>
    </div>
  )
}
