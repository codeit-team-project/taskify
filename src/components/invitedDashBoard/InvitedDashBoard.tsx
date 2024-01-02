import { useState, ChangeEvent } from 'react'
import styles from './InvitedDashBoard.module.scss'
import useDebounce from '@/hooks/useDebounce'
import { getInvitations } from '@/api/invitations/getInvitations'
import { putInvitation } from '@/api/invitations/putInvitation'
import { InvitationType } from '@/types/invitedDashBoardListType'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReceivedInvitationsType } from '@/types/invitations'

type InvitationsStatus =
  | 'noInvitations'
  | 'totalInvitations'
  | 'searchedInvitations'
  | 'noSearchedInvitations'

interface NoSearchedInvitationsProps {
  debouncedSearchTitle: string
}

interface InvitationsProps {
  invitationList: InvitationType[]
}

// interface InvitedDashboardProps {
//   list: InvitationType[]
// }

const getInvitationsType = (
  debouncedSearchTitle: string,
  invitationList: InvitationType[],
): InvitationsStatus => {
  if (!debouncedSearchTitle) {
    return invitationList && invitationList.length > 1 ? 'totalInvitations' : 'noInvitations'
  } else {
    return invitationList && invitationList.length > 1
      ? 'searchedInvitations'
      : 'noSearchedInvitations'
  }
}

function NoInvitations() {
  return (
    <div className={styles['no-invitation-container']}>
      <img
        className={styles['no-invitation-icon']}
        src="/assets/icon-no-invitation.png"
        width="100px"
        height="100px"
        alt="초대받은 대시보드가 없을 때 아이콘 이미지"
      />
      <p className={styles['no-invitation-text']}>아직 초대받은 대시보드가 없어요</p>
    </div>
  )
}

function NoSearchedInvitations({ debouncedSearchTitle }: NoSearchedInvitationsProps) {
  return (
    <tr>
      <td colSpan={3}>
        <p className={styles['no-searched-invitation-text']}>
          검색어 &quot;{debouncedSearchTitle}
          &quot;에 해당하는 대시보드가 없어요
        </p>
      </td>
    </tr>
  )
}

function Invitations({ invitationList }: InvitationsProps) {
  const queryClient = useQueryClient()

  const { mutate: respondInvitation } = useMutation({
    mutationKey: ['respondInvitation'],
    mutationFn: putInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInvitations'] })
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] })
    },
  })

  const respondToInvitation = (id: number, inviteAccepted: boolean) => {
    respondInvitation({
      id,
      inviteAccepted,
    })
  }

  return invitationList.map((item) => (
    <tr key={item.id} className={styles['invitation-item-container']}>
      <td className={styles['dashboard-title']}>
        <p className={styles['column-title']}>이름</p>
        {item.dashboard.title}
      </td>
      <td className={styles['inviter-name']}>
        <p className={styles['column-title']}>초대자</p>
        {item.invitee.nickname}
      </td>
      <td className={styles['response']}>
        <div className={styles['button-container']}>
          <button
            className={styles['button-accept']}
            onClick={() => {
              respondToInvitation(item.id, true)
            }}
          >
            수락
          </button>
          <button
            className={styles['button-decline']}
            onClick={() => {
              respondToInvitation(item.id, false)
            }}
          >
            거절
          </button>
        </div>
      </td>
    </tr>
  ))
}

export default function InvitedDashBoard() {
  // { list }: InvitedDashboardProps
  const [searchTitle, setSearchTitle] = useState('')
  const debouncedSearchTitle = useDebounce(searchTitle, 1000)

  const { data } = useQuery<ReceivedInvitationsType>({
    queryKey: ['getInvitations', debouncedSearchTitle],
    queryFn: () => getInvitations(debouncedSearchTitle),
  })

  const invitationList = data
    ? data.invitations.filter((item: InvitationType) => !item.inviteAccepted)
    : []

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value)
  }

  const uiType = getInvitationsType(debouncedSearchTitle, invitationList)

  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>초대받은 대시보드</h2>
      {uiType === 'noInvitations' ? (
        <NoInvitations />
      ) : (
        <table className={styles['invited-dashboard-table']}>
          <colgroup>
            <col className={styles['column-first']} />
            <col className={styles['column-second']} />
            <col className={styles['column-third']} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={3} className={styles['search-form-wrapper']}>
                <form>
                  <img
                    className={styles['search-icon']}
                    src="/assets/icon-search.png"
                    width="24px"
                    height="24px"
                    alt="검색 아이콘 이미지"
                  />
                  <input
                    id="title"
                    className={styles['search-input']}
                    placeholder="검색"
                    type="text"
                    value={searchTitle}
                    onChange={handleInputChange}
                  />
                </form>
              </th>
            </tr>
            <tr className={styles['column-title-container']}>
              <th className={styles['column-title']}>이름</th>
              <th className={styles['column-title']}>초대자</th>
              <th className={styles['column-title']}>수락 여부</th>
            </tr>
          </thead>
          <tbody>
            {uiType === 'noSearchedInvitations' ? (
              <NoSearchedInvitations debouncedSearchTitle={debouncedSearchTitle} />
            ) : (
              <Invitations invitationList={invitationList} />
            )}
          </tbody>
        </table>
      )}
    </section>
  )
}
