import React, { useContext, useEffect, useRef } from 'react'
import styles from '@/components/modalInput/DeadLine.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import calender from '../../../public/assets/images/calendar.svg'
import Image from 'next/image'
import { FormContext } from '@/context/formContext'
import DeadLineInput from './DeadLineInput'

export default function DeadLine({ EditDeadLine = '' }) {
  const { dueDate, setDueDate } = useContext(FormContext)
  const ref = useRef(null)

  useEffect(() => {
    if (EditDeadLine && EditDeadLine.length > 0) {
      const newDate = new Date(EditDeadLine)
      setDueDate(newDate)
    }
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>마감일</h1>
      <span className={styles.icon__container}>
        <Image src={calender} alt="calendar" className={styles.icon} />
      </span>
      <DatePicker
        locale={ko}
        // value={EditDeadLine}
        selected={dueDate}
        dateFormat="yyyy.MM.dd HH:mm"
        minDate={new Date()}
        onChange={(date) => {
          setDueDate(date)
        }}
        customInput={<DeadLineInput ref={ref} />}
        shouldCloseOnSelect
        showTimeSelect
      />
    </div>
  )
}
