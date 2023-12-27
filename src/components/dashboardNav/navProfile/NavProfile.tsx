/*Nav 바 오른쪽 프로필 컴포넌트

- DashboardNav 컴포넌트에 들어갈 하위 컴포넌트
- 유저의 프로필을 받아 프로필 이미지와 유저 닉네임을 렌더링하는 컴포넌트
*/

import { FocusEventHandler, MouseEventHandler, useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'

import { getUser } from '@/api/users/getUser'
import { UserType } from '@/types/users'
import styles from './NavProfile.module.scss'

interface NavProfileProps {
  onOpen: MouseEventHandler
  onClose: FocusEventHandler
}

export default function NavProfile({
  onOpen: handleOpenDropdown,
  onClose: handleCloseDropdown,
}: NavProfileProps) {
  const [userInfo, setUserInfo] = useState<UserType>()

  const { mutate } = useMutation({
    mutationKey: ['get-user-key'],
    mutationFn: useCallback(() => getUser(), []),
    onSuccess: (response) => {
      setUserInfo(() => {
        return { ...response }
      })
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <button
      className={styles['profile-section']}
      onClick={handleOpenDropdown}
      onBlur={handleCloseDropdown}
    >
      <Image
        src={userInfo?.profileImageUrl || '/assets/no-profile.png'}
        alt="profile img"
        width={36}
        height={36}
      />
      <div className={styles['nickname']}>{userInfo?.nickname}</div>
    </button>
  )
}
