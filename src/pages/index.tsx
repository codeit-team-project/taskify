import Image from 'next/image'
import { useRouter } from 'next/router'

import HomeLayout from '@/components/ui/layout/HomeLayout'
import styles from './Homepage.module.scss'

export default function Home() {
  const router = useRouter()

  const handleMoveToSignin = () => {
    router.push('/signin')
  }
  return (
    <HomeLayout>
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.img}>
            <Image src="/assets/homeImgs/desktop.png" alt="header img" layout="fill" />
          </div>
          <h1>
            새로운 일정 관리 <span>Taskify</span>
          </h1>
          <div className={styles.description}>센스있게 일정을 관리해보세요!</div>
          <button onClick={handleMoveToSignin}>로그인하기</button>
        </header>
      </div>
    </HomeLayout>
  )
}
