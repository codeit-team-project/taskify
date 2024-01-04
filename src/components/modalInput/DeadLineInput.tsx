import React, { forwardRef } from 'react'
import styles from '@/components/modalInput/DeadLineInput.module.scss'

const DeadLineInput = forwardRef((props, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <label>
      <input
        {...props}
        ref={ref}
        className={styles.container}
        placeholder="날짜를 입력해주세요"
        readOnly
      />
    </label>
  )
})

DeadLineInput.displayName = 'DeadLineInput'
export default DeadLineInput
