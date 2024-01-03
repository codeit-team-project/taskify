import { useRouter } from 'next/router'
import styles from '@/styles/NotFound.module.scss'
import { getCookie } from '@/utils/cookie'

export default function NotFound() {
  const router = useRouter()
  const savedToken = getCookie('accessToken')

  const handleRouting = () => {
    if (savedToken) router.push('/mydashboard')
    else router.push('/')
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <img src="/assets/error.png" alt="error img" />
      </div>
      <div className={styles.line}></div>
      <button onClick={handleRouting}> Home </button>
    </div>
  )
}
