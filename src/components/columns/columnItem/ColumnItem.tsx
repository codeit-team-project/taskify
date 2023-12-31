import { ColumnType } from '@/types/columnsType'
import ColumnTitle from '../columnTitle/ColumnTitle'
import TaskCardList from '../taskCardList/TaskCardList'
import styles from './ColumnItem.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getCards } from '@/api/card/getCards'
import { CardsType } from '@/types/cardsType'

interface ColumnItemProps {
  item: ColumnType
}
export default function ColumnItem({ item }: ColumnItemProps) {
  const { id } = item

  const { data } = useQuery<CardsType>({
    queryKey: ['getColumns', id],
    queryFn: () => getCards(id),
  })

  return (
    <li className={styles['column-item']}>
      {data && (
        <>
          <ColumnTitle title={item.title} number={data.cards.length} />
          <TaskCardList list={data.cards} />
        </>
      )}
    </li>
  )
}
