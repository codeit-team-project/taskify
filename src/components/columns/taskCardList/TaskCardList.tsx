import { CardType } from '@/types/cardsType'
import AddTaskButton from '../addTaskButton/AddTaskButton'
import styles from './TaskCardList.module.scss'

interface TaskCardListProps {
  list: CardType[]
}
export default function TaskCardList({ list }: TaskCardListProps) {
  return (
    <ul className={styles['task-list']}>
      <AddTaskButton />
      {list &&
        list.map((item) => {
          return (
            <li className={styles['task-card-container']} key={item.id}>
              {
                <img
                  className={styles['task-img']}
                  src="/assets/icon-add-purple.png"
                  width={24}
                  height={24}
                  alt="추가 버튼 이미지"
                />
              }
              <p className={styles['task-title']}>title</p>
              <ul className={styles['tag-list']}>
                {/* {item.tags.map((tag) => {
                  return (
                    <li
                      key={tag.id}
                      className={styles['tag']}
                      style={{ color: tag.fontColor, backgroundColor: tag.bgColor }}
                    >
                      {tag.text}
                    </li>
                  )
                })} */}
              </ul>
              <div className={styles['info']}>
                <img
                  className={styles['icon-calender']}
                  src="/assets/icon-calendar.png"
                  width={18}
                  height={18}
                  alt="달력 아이콘"
                />
                <p className={styles['date']}>{'date'}</p>
                <img
                  className={styles['icon-user']}
                  src={''}
                  width={24}
                  height={24}
                  alt="유저 프로필 아이콘"
                />
              </div>
            </li>
          )
        })}
    </ul>
  )
}
