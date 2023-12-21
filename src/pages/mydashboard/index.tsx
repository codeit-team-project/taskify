import InvitedDashBoard from '@/components/invitedDashBoard/InvitedDashBoard'
import {
  InvitedDashBoardItemType,
  InvitedDashBoardListType,
} from '@/types/invitedDashBoardListType'

// const TEMP_LIST = [
//   {
//     cursorId: 0,
//     id: 0,
//     inviterUserId: 0,
//     teamId: '2',
//     dashboard: {
//       title: '대시보드1',
//       id: 0,
//     },
//     invitee: {
//       nickname: '초대자1',
//       id: 0,
//     },
//     inviteAccepted: false,
//     createdAt: '2023-12-19T08:52:01.433Z',
//     updatedAt: '2023-12-19T08:52:01.433Z',
//   },
//   {
//     cursorId: 0,
//     id: 1,
//     inviterUserId: 0,
//     teamId: '2',
//     dashboard: {
//       title: '대시보드2',
//       id: 1,
//     },
//     invitee: {
//       nickname: '초대자2',
//       id: 0,
//     },
//     inviteAccepted: true,
//     createdAt: '2023-12-19T08:52:01.433Z',
//     updatedAt: '2023-12-19T08:52:01.433Z',
//   },
//   {
//     cursorId: 0,
//     id: 2,
//     inviterUserId: 0,
//     teamId: '2',
//     dashboard: {
//       title: '대시보드3',
//       id: 2,
//     },
//     invitee: {
//       nickname: '초대자3',
//       id: 0,
//     },
//     inviteAccepted: false,
//     createdAt: '2023-12-19T08:52:01.433Z',
//     updatedAt: '2023-12-19T08:52:01.433Z',
//   },
//   {
//     cursorId: 0,
//     id: 3,
//     inviterUserId: 0,
//     teamId: '2',
//     dashboard: {
//       title: '대시보드4',
//       id: 3,
//     },
//     invitee: {
//       nickname: '초대자4',
//       id: 0,
//     },
//     inviteAccepted: true,
//     createdAt: '2023-12-19T12:04:10.596Z',
//     updatedAt: '2023-12-19T12:04:10.596Z',
//   },
// ]

export default function MyDashboardPage({ ...pageProps }) {
  return (
    <>
      <InvitedDashBoard list={pageProps.list} />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const { invitations } = await getInvitations()

    const newInvitedDashboardList: InvitedDashBoardListType = invitations.filter(
      (item: InvitedDashBoardItemType) => !item.inviteAccepted,
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

export const getInvitations = async (title?: string) => {
  try {
    const query = title ? `size=10&title=${title}` : 'size=10'
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/invitations?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error()
    } else {
      const result = await response.json()
      return result
    }
  } catch (error) {
    throw error
  }
}
