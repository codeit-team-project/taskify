import MyPageLayout from '@/components/ui/layout/MypageLayout'
import Profile from '@/components/editForm/profile/Profile'
import PasswordModifier from '@/components/editForm/passwordModifier/PasswordModifier'
import styles from './index.module.scss'

export default function MyPage() {
  return (
    <>
      <MyPageLayout title="my">
        <div className={styles['my-page-container']}>
          <Profile />
          <PasswordModifier />
        </div>
      </MyPageLayout>
    </>
  )
}
