import React, { useContext, useEffect, useState } from 'react'
import styles from './ColumnName.module.scss'
import Image from 'next/image'
import arrowDown from '../../../public/assets/images/arrowDown.svg'
import { ColumnType } from '@/types/columnsType'
import { FormContext } from '@/context/formContext'

interface EdicColumn {
  editColumn: string
  editColumnId: number
  columnList: ColumnType[]
}
export default function ColumnName({ editColumnId, editColumn, columnList }: EdicColumn) {
  const { setColumnId, columnName, setColumnName } = useContext(FormContext)

  const [isOpen, setIsOpen] = useState(false)
  // dropdown메뉴 오픈
  const handleOpenClick = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    setColumnName(editColumn)
    setColumnId(editColumnId)
  }, [])

  return (
    <div className={styles.container}>
      <span className={styles.text}>상태</span>
      <div onClick={handleOpenClick} className={styles.dropdownbutton}>
        {columnName}
        <Image src={arrowDown} alt="arrowdown" width={20} height={20} />
        {isOpen && (
          <div className={styles.dropdown}>
            <ul>
              {columnList.map((column) => (
                <li
                  key={column.id}
                  onClick={() => {
                    setColumnId(column.id)
                    setColumnName(column.title)
                  }}
                >
                  {column.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
