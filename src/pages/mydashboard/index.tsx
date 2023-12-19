import InvitedDashBoard from '@/components/inviteddashboard/index'

const TEMP_LIST = [
  {
    id: 0,
    inviterUserId: 0,
    teamId: '2',
    dashboard: {
      title: '대시보드1',
      id: 0,
    },
    invitee: {
      nickname: '초대자1',
      id: 0,
    },
    inviteAccepted: false,
    createdAt: '2023-12-19T08:52:01.433Z',
    updatedAt: '2023-12-19T08:52:01.433Z',
  },
  {
    id: 1,
    inviterUserId: 0,
    teamId: '2',
    dashboard: {
      title: '대시보드2',
      id: 1,
    },
    invitee: {
      nickname: '초대자2',
      id: 0,
    },
    inviteAccepted: true,
    createdAt: '2023-12-19T08:52:01.433Z',
    updatedAt: '2023-12-19T08:52:01.433Z',
  },
  {
    id: 2,
    inviterUserId: 0,
    teamId: '2',
    dashboard: {
      title: '대시보드3',
      id: 2,
    },
    invitee: {
      nickname: '초대자3',
      id: 0,
    },
    inviteAccepted: false,
    createdAt: '2023-12-19T08:52:01.433Z',
    updatedAt: '2023-12-19T08:52:01.433Z',
  },
]

export type invitedDashboardListType =
  | {
      id: number
      inviterUserId: number
      teamId: string
      dashboard: {
        title: string
        id: number
      }
      invitee: {
        nickname: string
        id: number
      }
      inviteAccepted: boolean
      createdAt: string
      updatedAt: string
    }[]
  | null

export default function MyDashboardPage({ ...pageProps }) {
  return (
    <>
      <InvitedDashBoard list={pageProps.list} />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const newInvitedDashboardList: invitedDashboardListType = TEMP_LIST.filter(
      (item) => !item.inviteAccepted,
    )
    return {
      props: {
        list: newInvitedDashboardList,
        // list: null,
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
