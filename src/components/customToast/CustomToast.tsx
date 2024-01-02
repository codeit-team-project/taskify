import toast from 'react-hot-toast'

import styles from './CustomToast.module.scss'

export function toastUsingButton(message = '') {
  return toast((t) => (
    <div className={styles.container}>
      <span>{message}</span>
      <button className={styles.button} onClick={() => toast.dismiss(t.id)}>
        확인
      </button>
    </div>
  ))
}
