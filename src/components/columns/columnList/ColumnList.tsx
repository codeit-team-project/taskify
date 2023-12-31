import Image from 'next/image'
import styles from './ColumnList.module.scss'
import AddColumnButton from '@/components/columns/addColumnButton/AddColumnButton'
import ColumnItem from '../columnItem/ColumnItem'
import { useQuery } from '@tanstack/react-query'
import { getColumns } from '@/api/columns/getColumns'
import { ColumnsType } from '@/types/columnsType'

interface ColumnListProps {
  boardId: number
}

function NotFoundBoard() {
  return (
    <div className={styles['no-invitation-container']}>
      <Image
        className={styles['no-invitation-icon']}
        src="/assets/icon-no-invitation.png"
        width={100}
        height={100}
        alt="대시보드가 없을 때 아이콘 이미지"
      />
      <p className={styles['no-invitation-text']}>대시보드가 존재하지 않아요.</p>
    </div>
  )
}

export default function ColumnList({ boardId }: ColumnListProps) {
  const { data, isLoading } = useQuery<ColumnsType>({
    queryKey: ['getColumns', boardId],
    queryFn: () => getColumns(boardId),
    enabled: !!boardId,
    retry: 1,
  })

  return (
    <>
      {!data && !isLoading ? (
        <NotFoundBoard />
      ) : data && !isLoading ? (
        <ul className={styles['column-list']}>
          {data?.data.map((item) => {
            return <ColumnItem key={item.id} item={item} dashBoardId={boardId} columnId={item.id} />
          })}
          <AddColumnButton dashBoardId={boardId} />
        </ul>
      ) : (
        <></>
      )}
    </>
  )
}
