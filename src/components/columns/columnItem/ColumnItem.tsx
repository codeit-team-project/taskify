import { ColumnType } from '@/types/columnsType'
import TaskCardList from '../taskCardList/TaskCardList'
import styles from './ColumnItem.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getCards } from '@/api/card/getCards'
import { CardsType } from '@/types/cardsType'
import ManageColumnButton from '../manageColumnButton/ManageColumnButton'

interface ColumnItemProps {
  item: ColumnType
  dashBoardId: number
  columnId: number
}

export default function ColumnItem({ item, dashBoardId, columnId }: ColumnItemProps) {
  const { id, title } = item

  const { data } = useQuery<CardsType>({
    queryKey: ['getCards', id],
    queryFn: () => getCards(id),
  })

  return (
    <li className={styles['column-item']}>
      {data && (
        <>
          <div className={styles['column-title-container']}>
            <div className={styles['dot']}></div>
            <p className={styles['title']}>{title}</p>
            <p className={styles['number']}>{data.cards.length}</p>
            <ManageColumnButton
              originalTitle={title}
              dashBoardId={dashBoardId}
              columnId={columnId}
            />
          </div>
          <TaskCardList list={data.cards} dashBoardId={dashBoardId} columnId={columnId} />
        </>
      )}
    </li>
  )
}
