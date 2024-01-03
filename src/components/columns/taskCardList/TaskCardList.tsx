import { CardType } from '@/types/cardsType'
import AddTaskButton from '../addTaskButton/AddTaskButton'
import styles from './TaskCardList.module.scss'

import TaskCardItem from '../TaskCardItem/TaskCardItem'

interface TaskCardListProps {
  list: CardType[]
  dashBoardId: number
  columnId: number
}

export default function TaskCardList({ list, dashBoardId, columnId }: TaskCardListProps) {
  return (
    <ul className={styles['task-list']}>
      <AddTaskButton dashBoardId={dashBoardId} columnId={columnId} />
      {list &&
        list.map((item) => {
          return (
            <TaskCardItem key={item.id} item={item} dashBoardId={dashBoardId} columnId={columnId} />
          )
        })}
    </ul>
  )
}
