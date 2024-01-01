import React, { forwardRef } from 'react'
import styles from '@/components/modalInput/DeadLineInput.module.scss'

const DeadLineInput = forwardRef((props, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <label>
      <input {...props} ref={ref} className={styles.container} />
    </label>
  )
})

DeadLineInput.displayName = 'DeadLineInput'
export default DeadLineInput
