/*Nav 바 오른쪽 프로필 컴포넌트

TODO - NavProfileProps의 userInfo는 아직 type들을 덜 파악해서 그냥 any로 두었습니다. 후에 userType을 만들면 가져와 쓰겠습니당
- DashboardNav 컴포넌트에 들어갈 하위 컴포넌트
- 유저의 프로필을 받아 프로필 이미지와 유저 닉네임을 렌더링하는 컴포넌트
*/

import Image from 'next/image'
import styles from './NavProfile.module.scss'
import { FocusEventHandler, MouseEventHandler } from 'react'

interface NavProfileProps {
  onOpen: MouseEventHandler
  onClose: FocusEventHandler
  userInfo: any
}

export default function NavProfile({
  onOpen: handleOpenDropdown,
  onClose: handleCloseDropdown,
  userInfo,
}: NavProfileProps) {
  return (
    <button
      className={styles['profile-section']}
      onClick={handleOpenDropdown}
      onBlur={handleCloseDropdown}
    >
      <Image src={userInfo.user.profileImageUrl} alt="profile img" width={36} height={36} />
      <div className={styles['nickname']}>{userInfo.user.nickname}</div>
    </button>
  )
}
