import React, { forwardRef } from 'react'
import styles from '@/components/modalInput/DeadLineInput.module.scss'

const DeadLineInput = forwardRef((props, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <label>
      <input {...props} ref={ref} className={styles.container}></input>
    </label>
  )
})

DeadLineInput.displayName = 'DeadLineInput'
export default DeadLineInput
