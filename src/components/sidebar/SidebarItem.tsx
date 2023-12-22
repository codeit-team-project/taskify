/**
 * @TODO
 * 대시보드 response types 분리
 * api 연동 후 mock 데이터 삭제
 */

import Image from 'next/image'
import styles from './Sidebar.module.scss'
import EllipseIcon from '@/components/ui/icons/Ellipse'
import { DashBoardType } from '@/types/dashBoardType'

interface SidebarItemProps {
  board: DashBoardType
}

export default function SidebarItem({ board }: SidebarItemProps) {
  return (
    <>
      <EllipseIcon size={8} color={board.color} />
      <button className={styles.menu}>{board.title}</button>
      <span className={styles['icon-wrapper']}>
        {board.createdByMe && (
          <Image
            src="assets/crown_icon.svg"
            className={styles.icon}
            alt="내가 만든 대시보드"
            width={18}
            height={14}
          />
        )}
      </span>
    </>
  )
}
