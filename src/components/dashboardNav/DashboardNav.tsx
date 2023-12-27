/* DashboardNav 바 컴포넌트

- DashboardLayout 컴포넌트를 감싸는 컴포넌트
- 대시보드 페이지 위에 보이는 DashboardNav 바 컴포넌트 
- 옵셔널 인자로 dashboard 상세 조회 정보를 받음
*/

import Image from 'next/image'
import styles from './BoardNav.module.scss'
import DashboardNavEditor from './dashboardNavEditor/DashboardNavEditor'
import Dropdown from './dropdown/Dropdown'
import { mockDashboardInfo, mockDashboardMemberManyList } from './mockup'
import useDropdown from '@/hooks/useDropdown'
import NavProfile from './navProfile/NavProfile'
import { DashBoardType } from '@/types/dashBoardType'

interface DashboardNavProps {
  dashboardInfo?: DashBoardType | null
}

export default function DashboardNav({ dashboardInfo = null }: DashboardNavProps) {
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
        <NavProfile onOpen={handleOpenDropdown} onClose={handleCloseDropdown} />
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
