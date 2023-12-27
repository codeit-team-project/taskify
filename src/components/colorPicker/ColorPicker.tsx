/**
 * Color Picker
 * - 컬러를 변경하는 handleChangeColor 이벤트 핸들러 함수와 color를 전달 받는다.
 * - 컬러를 선택할때매다 컬러가 변경되고, 전달 받은 color와 일치하면 체크표시가 보인다.
 * - 전체 팔레트를 보여줘야 하는 case와 반응형에 따라 선택된 컬러만 보여주는 case를
 *   isVisibleAllColors prop으로 전달 받는다. (default는 true)
 */

import classNames from 'classnames'
import styles from './ColorPicker.module.scss'
import { COLOR_PALETTE } from '@/components/colorPicker/dashBoardColorPalette'

interface ColorPickerProps {
  isVisibleAllColors?: boolean
  selectedColor: string
  handleChangeColor: (selectedColor: string) => void // type 오류 해결하기
}

export default function ColorPicker({
  isVisibleAllColors = true,
  selectedColor,
  handleChangeColor,
}: ColorPickerProps) {
  const handleClickColor = (color: string) => () => {
    return handleChangeColor(color)
  }

  return (
    <div className={styles.colors}>
      {COLOR_PALETTE.map((palette) => (
        <div
          key={palette.color}
          className={classNames(styles[`color-${palette.color}`], {
            [styles['invisible']]: !isVisibleAllColors && selectedColor !== palette.hexCode,
          })}
          onClick={handleClickColor(palette.hexCode)}
        >
          {selectedColor === palette.hexCode && (
            <img src="/assets/checkIcon.svg" className={styles.check} />
          )}
        </div>
      ))}
    </div>
  )
}
