import styles from './DashboardList.module.scss'
import EllipseIcon from '@/components/ui/icons/Ellipse'

interface DashboardItemProps {
  title: string
  color: string
}

export default function DashboardItem({ title, color }: DashboardItemProps) {
  return (
    <div className={styles.button}>
      <div className={styles.contents}>
        <EllipseIcon size={8} color={color} />
        <span className={styles.description}>
          <span className={styles.title}>{title}</span>
          <img src="/assets/crown_icon.svg" />
        </span>
      </div>
      <img src="/arrow_next.svg" className={styles.icon} />
    </div>
  )
}
