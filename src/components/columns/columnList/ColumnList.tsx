import styles from './ColumnList.module.scss'
import AddColumnButton from '@/components/columns/addColumnButton/AddColumnButton'
import ColumnItem from '../columnItem/ColumnItem'
import { useQuery } from '@tanstack/react-query'
import { getColumns } from '@/api/columns/getColumns'
import { ColumnsType } from '@/types/columnsType'

interface ColumnListProps {
  boardId: number
}

export default function ColumnList({ boardId }: ColumnListProps) {
  const { data } = useQuery<ColumnsType>({
    queryKey: ['getColumns', boardId],
    queryFn: () => getColumns(boardId),
    enabled: !!boardId,
  })

  return (
    <>
      <ul className={styles['column-list']}>
        {data?.data.map((item) => {
          return <ColumnItem key={item.id} item={item} />
        })}
        <AddColumnButton dashBoardId={boardId} />
      </ul>
    </>
  )
}
