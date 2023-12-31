import styles from './ColumnList.module.scss'
import AddColumnButton from '@/components/columns/addColumnButton/AddColumnButton'
import ColumnItem from '../columnItem/ColumnItem'

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
