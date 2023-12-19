/**
 * @TODO
 * 대시보드 response types 분리
 * api 연동 후 mock 데이터 삭제
 * ellipse svg ui 공통 컴포넌트 분리
 * Next Image 컴포넌트로 변경
 */

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
      <span>{board.title}</span>
      {board.createdByMe && <img src="crown_icon.svg" />}
    </>
  )
}
