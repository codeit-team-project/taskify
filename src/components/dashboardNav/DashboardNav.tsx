/* DashboardNav 바 컴포넌트

TODO - 나중에 유저, 대시보드 api와 연동해 유저 profile과 nickname 데이터를 보여줄 것
TODO - 유저 정보와 대시보드 정보는 context로 관리해야 할 거 같아서 인자로 받지 않고 지금은 mock 데이터를 사용함, 나중에 코드 수정할 것
- 내 대시보드, 대시보드 페이지에 들어갈 DashboardNav 바 컴포넌트
- 불린형 인자 isMyDashboard를 받고, true라면 /mydashboard 페이지에 있는 것으로 해석
 */

import Image from 'next/image'
import Link from 'next/link'
import styles from './DashboardNav.module.scss'
import DashboardNavEditor from './dashboardNavEditor/DashboardNavEditor'
import Dropdown from './dropdown/Dropdown'
import {
  mockupUser,
  mockDashboardMemberSmallList,
  mockDashboardInfo,
  // mockDashboardMemberManyList,
} from './mockup'
import useDropdown from '@/hooks/useDropdown'

const MY_DASHBOARD_INFO = {
  id: 0,
  title: '내 대시보드',
  createdByMe: true,
  userId: 1,
}

export default function DashboardNav({ isMyDashboard = true }) {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']} data-my-dashboard={isMyDashboard}>
        {isMyDashboard ? (
          <Link href="/mydashboard">{MY_DASHBOARD_INFO.title}</Link>
        ) : (
          <>
            {mockDashboardInfo.title}
            {mockDashboardInfo.createdByMe && (
              <span>
                <Image src="assets/crown_icon.svg" alt="owner" width={20} height={20} />{' '}
              </span>
            )}
          </>
        )}
      </div>
      <div className={styles['nav-info-section']}>
        {!isMyDashboard && (
          <DashboardNavEditor
            isOwner={mockDashboardInfo.createdByMe}
            boardId={mockDashboardInfo.id}
            members={mockDashboardMemberSmallList}
          />
        )}
        <button
          className={styles['profile-section']}
          onClick={handleOpenDropdown}
          onBlur={handleCloseDropdown}
        >
          <Image src={mockupUser.user.profileImageUrl} alt="profile img" width={36} height={36} />
          <div className={styles['nickname']}>{mockupUser.user.nickname}</div>
        </button>
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
