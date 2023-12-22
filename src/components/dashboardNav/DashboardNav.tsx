/* DashboardNav 바 컴포넌트

TODO - 나중에 유저, 대시보드 api와 연동해 유저 profile과 nickname 데이터를 보여줄 것
TODO - 유저 정보와 대시보드 정보는 context로 관리해야 할 거 같아서 인자로 받지 않고 지금은 mock 데이터를 사용함, 나중에 코드 수정할 것
- 내 대시보드, 대시보드 페이지에 들어갈 DashboardNav 바 컴포넌트
- boolean형 인자 isMyPage를 받고,
    1. if true 라면 DashboardNavEditor 컴포넌트는 렌더링하지 않음.
    2. if false 라면 대시보드 정보를 출력, DashboardNavEditor 컴포넌트를 렌더링.
 */

import Image from 'next/image'
import Link from 'next/link'
import styles from './DashboardNav.module.scss'
import DashboardNavEditor from './dashboardNavEditor/DashboardNavEditor'
import Dropdown from './dropdown/Dropdown'
import {
  mockupUser,
  // mockDashboardMemberSmallList,
  mockDashboardInfo,
  mockDashboardMemberManyList,
} from './mockup'
import useDropdown from '@/hooks/useDropdown'
import NavProfile from './navProfile/NavProfile'

interface DashboardNavProps {
  pageTitle?: 'mydashboard' | 'my'
}

export default function DashboardNav({ pageTitle }: DashboardNavProps) {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']} data-my-dashboard={pageTitle}>
        {pageTitle ? (
          <Link href={`/${pageTitle}`}>
            {pageTitle === 'mydashboard' ? '내 대시보드' : '계정관리'}
          </Link>
        ) : (
          <>
            {mockDashboardInfo?.title}
            {mockDashboardInfo?.createdByMe && (
              <span>
                <Image src="assets/crown_icon.svg" alt="owner" width={20} height={20} />
              </span>
            )}
          </>
        )}
      </div>
      <div className={styles['nav-info-section']}>
        {!pageTitle && (
          <DashboardNavEditor
            isOwner={mockDashboardInfo.createdByMe}
            boardId={mockDashboardInfo.id}
            members={mockDashboardMemberManyList}
          />
        )}
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
