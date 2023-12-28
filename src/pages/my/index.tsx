import MyPageLayout from '@/components/ui/layout/MypageLayout'
import Profile from '@/components/profile/Profile'

export default function MyPage() {
  return (
    <>
      <MyPageLayout title="my">
        <Profile />
        <div>계정 관리 및 개인정보 수정을 담당하는 마이 페이지!!</div>
      </MyPageLayout>
    </>
  )
}
