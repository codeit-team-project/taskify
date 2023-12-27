/* DashboardNav 바 컴포넌트

- 내 대시보드, 대시보드 페이지에 들어갈 DashboardNav 바 컴포넌트
- boolean형 인자 isMyPage를 받고,
    1. if true 라면 DashboardNavEditor 컴포넌트는 렌더링하지 않음.
    2. if false 라면 대시보드 정보를 출력, DashboardNavEditor 컴포넌트를 렌더링.
 */

import Image from 'next/image'
import styles from './BoardNav.module.scss'
import DashboardNavEditor from './dashboardNavEditor/DashboardNavEditor'
import Dropdown from './dropdown/Dropdown'
import { mockupUser, mockDashboardInfo, mockDashboardMemberManyList } from './mockup'
import useDropdown from '@/hooks/useDropdown'
import NavProfile from './navProfile/NavProfile'

export default function DashboardNav() {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']}>
        <>
          {mockDashboardInfo?.title}
          {mockDashboardInfo?.createdByMe && (
            <span>
              <Image src="/assets/crown_icon.svg" alt="owner" width={20} height={20} />
            </span>
          )}
        </>
      </div>
      <div className={styles['nav-info-section']}>
        <DashboardNavEditor
          isOwner={mockDashboardInfo.createdByMe}
          boardId={mockDashboardInfo.id}
          members={mockDashboardMemberManyList}
        />
        <NavProfile
          onOpen={handleOpenDropdown}
          onClose={handleCloseDropdown}
          userInfo={mockupUser}
        />
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
