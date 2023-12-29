/* DashboardNav 바 컴포넌트

TODO - 대시보드 페이지 작업하면서 한꺼번에 해야 할듯 합니다
- DashboardLayout 컴포넌트를 감싸는 컴포넌트
- 대시보드 페이지 위에 보이는 DashboardNav 바 컴포넌트 
- 옵셔널 인자로 dashboard 상세 조회 정보를 받음
*/

import Image from 'next/image'

import useDropdown from '@/hooks/useDropdown'
import Dropdown from './dropdown/Dropdown'
import NavProfile from './navProfile/NavProfile'
import styles from './BoardNav.module.scss'

interface DashboardNavProps {
  boardId?: Number
}

export default function DashboardNav({ boardId }: DashboardNavProps) {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']}>
        <>
          {/* {dashboardInfo?.title}
          {dashboardInfo?.createdByMe && (
            <span>
              <Image src="/assets/crown_icon.svg" alt="owner" width={20} height={20} />
            </span>
          )} */}
        </>
      </div>
      <div className={styles['nav-info-section']}>
        {/* <DashboardNavEditor
          isOwner={dashboardInfo?.createdByMe}
          boardId={dashboardInfo?.id}
          members={mockDashboardMemberManyList}
        /> */}
        <NavProfile onOpen={handleOpenDropdown} onClose={handleCloseDropdown} />
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
