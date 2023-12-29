import { getInvitations } from '@/api/invitations/getInvitations'
import DashboardList from '@/components/dashboard/DashboardList'
import InvitedDashBoard from '@/components/invitedDashBoard/InvitedDashBoard'
import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import { ReceivedInvitationsType } from '@/types/invitations'
import { InvitationType } from '@/types/invitedDashBoardListType'

export default function MyDashboardPage({ ...pageProps }) {
  return (
    <DashboardLayout>
      <DashboardList />
      <InvitedDashBoard list={pageProps.list} />
    </DashboardLayout>
  )
}

export async function getServerSideProps() {
  try {
    const { invitations } = await getInvitations()

    const newInvitedDashboardList: ReceivedInvitationsType['invitations'] = invitations.filter(
      (item: InvitationType) => !item.inviteAccepted,
    )

    return {
      props: {
        list: newInvitedDashboardList,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        list: null,
      },
    }
  }
}
