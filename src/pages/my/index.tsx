/* 마이 페이지

- 경로: /my
*/

import MyPageLayout from '@/components/ui/layout/MypageLayout'
import Profile from '@/components/editForm/profile/Profile'
import PasswordModifier from '@/components/editForm/passwordModifier/PasswordModifier'
import withAuth from '@/hocs/withAuth'

function MyPage() {
  return (
    <>
      <MyPageLayout title="my">
        <Profile />
        <PasswordModifier />
      </MyPageLayout>
    </>
  )
}

export default withAuth(MyPage)
