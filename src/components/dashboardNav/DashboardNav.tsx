/* DashboardNav 바 컴포넌트

- DashboardLayout 컴포넌트를 감싸는 컴포넌트
- 대시보드 페이지 위에 보이는 DashboardNav 바 컴포넌트 
- boardId 값을 받으면 해당 보드의 title, 멤버 수 등 정보를 나타냄
- boardId 값이 없으면 /dashboard 페이지로 인지하고 아무 정보도 나타내지 않음.
*/

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getDashBoardsDetail } from '@/api/dashboards/getDashboardsDetail'
import Dropdown from '@/components/dashboardNav/dropdown/Dropdown'
import NavProfile from '@/components/dashboardNav/navProfile/NavProfile'
import DashboardNavEditor from '@/components/dashboardNav/dashboardNavEditor/DashboardNavEditor'
import useDropdown from '@/hooks/useDropdown'
import { DashBoardType } from '@/types/dashBoardType'

import styles from './BoardNav.module.scss'

interface DashboardNavProps {
  boardId: number
}

export default function DashboardNav({ boardId }: DashboardNavProps) {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  const { data: boardInfo } = useQuery<DashBoardType>({
    queryKey: ['dashBoardsDetail', boardId],
    queryFn: () => getDashBoardsDetail(boardId),
  })

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']}>
        <>
          {boardInfo?.title}
          {boardInfo?.createdByMe && (
            <span>
              <Image src="/assets/crown_icon.svg" alt="owner" width={20} height={20} />
            </span>
          )}
        </>
      </div>
      <div className={styles['nav-info-section']}>
        <DashboardNavEditor isOwner={boardInfo?.createdByMe} boardId={boardId} />
        <NavProfile onOpen={handleOpenDropdown} onClose={handleCloseDropdown} />
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
