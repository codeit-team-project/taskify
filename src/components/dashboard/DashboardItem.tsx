import EllipseIcon from '@/components/ui/icons/Ellipse'

interface DashboardItemProps {
  dashBoardId: number
  title: string
  color: string
}

export default function DashboardItem({ dashBoardId, title, color }: DashboardItemProps) {
  console.log(dashBoardId)

  return (
    <div>
      <EllipseIcon size={8} color={color} />
      <span>{title}</span>
      <img src="/arrow_next.svg" />
    </div>
  )
}
