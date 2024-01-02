import { getInvitations } from '@/api/invitations/getInvitations'
import DashboardList from '@/components/dashboard/DashboardList'
import InvitedDashBoard from '@/components/invitedDashBoard/InvitedDashBoard'
import HeadMeta from '@/components/seo/HeadMeta'
import MyPageLayout from '@/components/ui/layout/MypageLayout'
import { ReceivedInvitationsType } from '@/types/invitations'
import { InvitationType } from '@/types/invitedDashBoardListType'

export default function MyDashboardPage({ ...pageProps }) {
  return (
    <MyPageLayout title="mydashboard">
      <HeadMeta title={pageProps.title} />
      <DashboardList />
      <InvitedDashBoard
      // list={pageProps.list}
      />
    </MyPageLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      title: '',
    },
  }
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
