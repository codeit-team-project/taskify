/*Nav 바 오른쪽 프로필 컴포넌트

- DashboardNav 컴포넌트에 들어갈 하위 컴포넌트
- 유저의 프로필을 받아 프로필 이미지와 유저 닉네임을 렌더링하는 컴포넌트
*/

import { FocusEventHandler, MouseEventHandler } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/api/users/getUser'
import { UserType } from '@/types/users'
import RandomProfile from '@/components/randomProfile/RandomProfile'
import styles from './NavProfile.module.scss'

interface NavProfileProps {
  onOpen: MouseEventHandler
  onClose: FocusEventHandler
}

export default function NavProfile({
  onOpen: handleOpenDropdown,
  onClose: handleCloseDropdown,
}: NavProfileProps) {
  const { data: userInfo } = useQuery<UserType>({
    queryKey: ['profile-key'],
    queryFn: () => getUser(),
    staleTime: 1000,
  })

  return (
    <button
      className={styles['profile-section']}
      onClick={handleOpenDropdown}
      onBlur={handleCloseDropdown}
    >
      {userInfo?.profileImageUrl ? (
        <Image src={userInfo?.profileImageUrl} alt="profile img" width={36} height={36} />
      ) : (
        <RandomProfile size={36} email={userInfo?.email || 'a'} />
      )}
      <div className={styles['nickname']}>{userInfo?.nickname}</div>
    </button>
  )
}
