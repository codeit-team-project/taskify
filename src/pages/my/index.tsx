/* 마이 페이지

- 경로: /my
*/

import MyPageLayout from '@/components/ui/layout/MypageLayout'
import Profile from '@/components/editForm/profile/Profile'
import PasswordModifier from '@/components/editForm/passwordModifier/PasswordModifier'

export default function MyPage() {
  return (
    <>
      <MyPageLayout title="my">
        <Profile />
        <PasswordModifier />
      </MyPageLayout>
    </>
  )
}
