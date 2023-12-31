import styles from './AddTaskButton.module.scss'

export default function AddTaskButton() {
  return (
    <button className={styles['add-task-button-container']}>
      <img src="/assets/icon-add-purple.png" width={24} height={24} alt="추가 버튼 이미지" />
    </button>
  )
}
