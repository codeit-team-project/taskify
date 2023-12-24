import Image from 'next/image'
import styles from './LoadingSpinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles['spinner-body']}>
      <div className={styles['spinner-container']}>
        <Image
          src="assets/Spinner-1s-200px.gif"
          unoptimized={true}
          width={200}
          height={200}
          alt="is loading..."
        />
      </div>
    </div>
  )
}
