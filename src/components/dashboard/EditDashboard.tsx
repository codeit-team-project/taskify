/**
 * @todo
 * 해당 대시보드 기존 값이 default로 설정되어 있음
 * 이름이나 색을 바꾸고 '변경' 버튼을 누르면 대시보드가 수정
 * 컬러팔레트 svg 파일 말고 css로 작업
 * 모바일 사이즈에서 컬러팔레트 선택된 것만 보이기
 * 수정후에 사이드바, 네브바 대시보드 이름 변경 확인하기
 * 에러케이스 확인하기
 */

import { ChangeEvent, useState } from 'react'
import classNames from 'classnames'

import { COLOR_PALETTE, DEFAULT_COLOR } from '@/utils/dashBoardColorPalette'
import styles from './EditDashboard.module.scss'

import EllipseIcon from '@/components/ui/icons/Ellipse'

export default function EditDashboard() {
  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeColor = (color: string) => () => {
    setSelectedColor(color)
  }

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <span className={styles.title}>대시보드 이름</span>
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
      </div>
      <div className={styles.contents}>
        <p className={styles.description}>대시보드 이름</p>
        <input className={styles.input} onChange={handleChangeInput} value={title} />
      </div>
      <div className={styles.button}>
        <button
          className={classNames(styles['primary-button'], {
            [styles.inActive]: !title || !selectedColor,
          })}
        >
          변경
        </button>
      </div>
    </section>
  )
}
