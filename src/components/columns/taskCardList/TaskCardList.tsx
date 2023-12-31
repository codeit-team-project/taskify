import AddTaskButton from '../addTaskButton/AddTaskButton'
import TaskCardItem from '../taskCardItem/TaskCardItem'
import styles from './TaskCardList.module.scss'

export default function TaskCardList() {
  return (
    <ul className={styles['task-list']}>
      <AddTaskButton />
      <TaskCardItem />
      <TaskCardItem />
      <TaskCardItem />
    </ul>
  )
}
