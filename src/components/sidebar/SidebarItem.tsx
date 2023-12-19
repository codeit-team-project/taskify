/**
 * @TODO
 * 대시보드 response types 분리
 * api 연동 후 mock 데이터 삭제
 * Next Image 컴포넌트로 변경
 * 반응형 스타일 적용
 */

import styles from './Sidebar.module.scss'
import EllipseIcon from '@/components/icons/Ellipse'

interface SidebarItemProps {
  board: {
    id: number
    title: string
    color: string
    createdAt: string
    updatedAt: string
    createdByMe: boolean
    userId: number
  }
}

export default function SidebarItem({ board }: SidebarItemProps) {
  return (
    <>
      <EllipseIcon size={8} color={board.color} />
      <button className={styles.menu}>{board.title}</button>
      {board.createdByMe && <img src="crown_icon.svg" alt="내가 만든 대시보드" />}
    </>
  )
}
