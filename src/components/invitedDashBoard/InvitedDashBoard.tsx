import { useState } from 'react'
import styles from './InvitedDashBoard.module.scss'
import {
  InvitedDashBoardItemType,
  InvitedDashBoardListType,
} from '@/types/invitedDashBoardListType'
import useDebounce from '@/hooks/useDebounce'
import { getInvitations } from '@/pages/mydashboard'
import useDidMountEffect from '@/hooks/useDidMountEffect'

interface InvitedDashboardProps {
  list: InvitedDashBoardListType
}

export default function InvitedDashBoard({ list }: InvitedDashboardProps) {
  const [tableData, setTableData] = useState<InvitedDashBoardListType>(list)
  const [searchTitle, setSearchTitle] = useState('')
  const debouncedSearchTitle = useDebounce(searchTitle, 1000)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value)
  }

  useDidMountEffect(() => {
    const getInvitationsByTitle = async () => {
      try {
        const { invitations } = await getInvitations(debouncedSearchTitle)

        const newInvitations: InvitedDashBoardListType = invitations.filter(
          (item: InvitedDashBoardItemType) => !item.inviteAccepted,
        )

        setTableData(newInvitations)
      } catch (error) {
        console.error('Error fetching data:', error)
        return {
          props: {
            list: null,
          },
        }
      }
    }
    getInvitationsByTitle()
  }, [debouncedSearchTitle])

  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>초대받은 대시보드</h2>

      {tableData && debouncedSearchTitle ? (
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
                    src="assets/icon-search.png"
                    width="24px"
                    height="24px"
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
              <th>이름</th>
              <th>초대자</th>
              <th>수락 여부</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 1 &&
              tableData?.map((item) => (
                <tr key={item.id} className={styles['dashboard-item']}>
                  <td className={styles['dashboard-name']}>{item.dashboard.title}</td>
                  <td className={styles['inviter-name']}>{item.invitee.nickname}</td>
                  <td>
                    <div className={styles['button-container']}>
                      <button className={styles['button-accept']}>수락</button>
                      <button className={styles['button-decline']}>거절</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className={styles['no-invitation-container']}>
          <img
            className={styles['no-invitation-icon']}
            src="assets/icon-no-invitation.png"
            width="100px"
            height="100px"
          />
          <p className={styles['no-invitation-text']}>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </section>
  )
}
