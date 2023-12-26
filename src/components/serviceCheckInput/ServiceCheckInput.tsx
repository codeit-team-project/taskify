/* Signup 페이지에 쓸 이용약관 체크박스 컴포넌트

TODO - 이용약관 모달 창 만들기. 지금은 임시로 alert 로 구현함
*/

import { ChangeEvent } from 'react'
import styles from './ServiceCheckInput.module.scss'

// function ServiceTerm(){
//   return (
//   <div>
//     이용약관 내용을 담을 div!
//   </div>)
// }

interface ServiceCheckInputProps {
  setBlank: (s: boolean) => void
}

export default function ServiceChekInput({ setBlank }: ServiceCheckInputProps) {
  const openServiceTerm = () => {
    alert('이용약관 임시 창')
  }

  const handleClickBox = (e: ChangeEvent<HTMLInputElement>) => {
    setBlank(!e.target.checked)
  }

  return (
    <div className={styles['service-term']}>
      <input type="checkbox" onChange={handleClickBox} />
      <button type="button" onClick={openServiceTerm} className={styles['service-term-button']}>
        이용약관
      </button>
      에 동의합니다.
    </div>
  )
}
