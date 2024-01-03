import DashboardList from '@/components/dashboard/DashboardList'
import InvitedDashBoard from '@/components/invitedDashBoard/InvitedDashBoard'
import MyPageLayout from '@/components/ui/layout/MypageLayout'

import styles from './index.module.scss'

export default function MyDashboardPage() {
  return (
    <MyPageLayout title="mydashboard">
      <div className={styles.container}>
        <DashboardList />
        <InvitedDashBoard />
      </div>
    </MyPageLayout>
  )
}

/**
 * TODO
 * getServerSideProps로 데이터 페치하고, InvitedDashBoard 컴포넌트 초기 렌더링 시 getInvitations 실행되지 않도록 useDidMountEffect 적용
 */
// export async function getServerSideProps() {
//   try {
//     const { invitations } = await getInvitations()

//     const newInvitedDashboardList: ReceivedInvitationsType['invitations'] = invitations.filter(
//       (item: InvitationType) => !item.inviteAccepted,
//     )

//     return {
//       props: {
//         list: newInvitedDashboardList,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     return {
//       props: {
//         list: null,
//       },
//     }
//   }
// }
