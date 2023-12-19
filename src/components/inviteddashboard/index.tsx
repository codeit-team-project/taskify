import { invitedDashboardListType } from '@/types/invitedDashboardListType'
import styles from './invitedDashboard.module.scss'

export interface invitedDashboardProps {
  list: invitedDashboardListType
}
export default function InvitedDashBoard({ list }: invitedDashboardProps) {
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>초대받은 대시보드</h2>

      {list ? (
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
                  <input className={styles['search-input']} placeholder="검색" type="text" />
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
            {list.map((item) => (
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
