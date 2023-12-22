import { ReactNode } from 'react'
import styles from './Layout.module.scss'
import Link from 'next/link'

interface SignLayoutProps {
  children: ReactNode
  isSignin: boolean
}

export default function SignLayout({ children, isSignin }: SignLayoutProps) {
  const messages = {
    greeting: isSignin ? '오늘도 만나서 반가워요!' : '첫 방문을 환영합니다!',
    guiding: isSignin ? '회원이 아니신가요?' : '이미 가입하셨나요?',
    linkName: isSignin ? '회원가입하기' : '로그인하기',
    linkPath: isSignin ? '/signup' : '/signin',
  }
  return (
    <>
      <div className={styles['sign-layout-body']}>
        <div className={styles['container']}>
          <Link href="/">
            <div className={styles['logo-container']}>
              <img src="assets/large_logo.svg" alt="logo" className={styles['logo-img']} />
              <img
                src="assets/large_Taskify.svg"
                alt="logo title"
                className={styles['logo-title-img']}
              />
            </div>
          </Link>
          <div className={styles['greeting-container']}>{messages.greeting}</div>
          <div className={styles['form-container']}>{children}</div>
          <div className={styles['link-container']}>
            <span>{messages.guiding}</span>
            <Link href={messages.linkPath}>{messages.linkName}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
