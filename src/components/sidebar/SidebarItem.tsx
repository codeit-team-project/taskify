/**
 * @TODO
 * 대시보드 response types 분리
 * api 연동 후 mock 데이터 삭제
 * ellipse svg ui 공통 컴포넌트 분리
 * Next Image 컴포넌트로 변경
 */

import styles from './Sidebar.module.scss'

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
      <img src="ellipse.svg" />
      <button className={styles.menu}>{board.title}</button>
      {board.createdByMe && <img src="crown_icon.svg" />}
    </>
  )
}
