import styles from './TaskCardItem.module.scss'

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

export default function TaskCardItem() {
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
