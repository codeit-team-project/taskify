/*Nav 바 오른쪽 프로필 컴포넌트

- DashboardNav 컴포넌트에 들어갈 하위 컴포넌트
- 유저의 프로필을 받아 프로필 이미지와 유저 닉네임을 렌더링하는 컴포넌트
*/

import Image from 'next/image'
import styles from './NavProfile.module.scss'
import { FocusEventHandler, MouseEventHandler, useCallback, useEffect } from 'react'
import { mockupUser } from '../mockup'
import { getUser } from '@/api/users/getUser'
import { useMutation } from '@tanstack/react-query'

interface NavProfileProps {
  onOpen: MouseEventHandler
  onClose: FocusEventHandler
}

export default function NavProfile({
  onOpen: handleOpenDropdown,
  onClose: handleCloseDropdown,
}: NavProfileProps) {
  /*
  BUG - 아직 토큰 붙여서 req 보내는 코드가 없어서 이 부분 쓰면 에러남. 
  후에 코드 머지한다음 이 부분 살리면 됨
  const [userInfo, setUserInfo] = useState<UserType>();
  const { mutate } = useMutation({
    mutationKey: ['get-user-key'],
    mutationFn: useCallback(() => getUser(), []),
    onSuccess: (response) => {
      console.log(response)
      return response
    },
    onError: () => {},
  })
  useEffect(() => {
    mutate()
  }, [mutate])
  */
  return (
    <button
      className={styles['profile-section']}
      onClick={handleOpenDropdown}
      onBlur={handleCloseDropdown}
    >
      <Image src={mockupUser.user.profileImageUrl} alt="profile img" width={36} height={36} />
      <div className={styles['nickname']}>{mockupUser.user.nickname}</div>
    </button>
  )
}
