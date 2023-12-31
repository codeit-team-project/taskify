import ColumnTitle from '../columnTitle/ColumnTitle'
import TaskCardList from '../taskCardList/TaskCardList'
import styles from './ColumnItem.module.scss'

interface ColumnItemProps {
  title: string
  number: number
}

export default function ColumnItem({ title, number }: ColumnItemProps) {
  return (
    <li className={styles['column-item']}>
      <ColumnTitle title={title} number={number} />
      <TaskCardList />
    </li>
  )
}
