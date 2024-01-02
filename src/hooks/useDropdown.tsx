/* 드롭다운 메뉴를 열고 닫을 때 사용하는 커스텀 훅

- nav 바, 할일 카드 모달 등 드롭다운을 관리할 때 씀
- useState 로 드롭다운 메뉴가 보이는지, 안 보이는지를 관리함
- handleOpenDropdown 메소드는 드롭다운 메뉴를 여는 메소드
- handleCloseDropdown 메소드는 드롭다운 메뉴를 닫는 메소드로 onBlur 시 실행됨
*/

// import { FocusEventHandler, MouseEventHandler, useState } from 'react'
import { useState } from 'react'

export default function useDropdown() {
  // isVisible이 true면 드롭다운이 보임
  const [isVisible, setIsVisible] = useState(false)
  const handleOpenDropdown = () => {
    setIsVisible(true)
  }
  const handleCloseDropdown = () => {
    setTimeout(() => {
      setIsVisible(false)
    }, 200)
  }

  const data: [boolean, () => void, () => void] = [
    isVisible,
    handleOpenDropdown,
    handleCloseDropdown,
  ]

  return data
}
