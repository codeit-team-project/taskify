import Image from 'next/image'
import styles from './ColumnList.module.scss'
import AddColumnButton from '@/components/addColumnButton/AddColumnButton'

const TEMP_TAG_LIST = [
  {
    id: 1,
    text: 'tag1',
    fontColor: '#FFFFFF',
    bgColor: '#000000',
  },
  {
    id: 2,
    text: 'tag1',
    fontColor: '#000000',
    bgColor: '#FFFFFF',
  },
]

export default function ColumnList() {
  return (
    <>
      <ul className={styles['column-list']}>
        <ColumnItem title={'Title'} number={3} />
        <ColumnItem title={'Title'} number={3} />
        <ColumnItem title={'Title'} number={3} />
        <AddColumnButton />
      </ul>
    </>
  )
}

interface ColumnItemProps {
  title: string
  number: number
}

function ColumnItem({ title, number }: ColumnItemProps) {
  return (
    <li className={styles['column-item']}>
      <ColumnTitle title={title} number={number} />
      <TaskCardList />
    </li>
  )
}

interface ColumnTitleProps {
  title: string
  number: number
}

function ColumnTitle({ title, number }: ColumnTitleProps) {
  return (
    <div className={styles['column-title-container']}>
      <div className={styles['dot']}></div>
      <p className={styles['title']}>{title}</p>
      <p className={styles['number']}>{number}</p>
      <button className={styles['button-setting-wrapper']}>
        <Image src="/assets/settingIcon.svg" alt="setting icon" width={24} height={24} />
      </button>
    </div>
  )
}

function TaskCardList() {
  return (
    <ul className={styles['task-list']}>
      <AddTaskButton />
      <TaskCardItem />
      <TaskCardItem />
      <TaskCardItem />
    </ul>
  )
}

function AddTaskButton() {
  return (
    <button className={styles['add-task-button-container']}>
      <img src="/assets/icon-add-purple.png" width={24} height={24} alt="추가 버튼 이미지" />
    </button>
  )
}

function TaskCardItem() {
  return (
    <li className={styles['task-card-container']}>
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
        {TEMP_TAG_LIST.map((tag) => {
          return (
            <li
              key={tag.id}
              className={styles['tag']}
              style={{ color: tag.fontColor, backgroundColor: tag.bgColor }}
            >
              {tag.text}
            </li>
          )
        })}
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
}
