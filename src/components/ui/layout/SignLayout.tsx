import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Layout.module.scss'

interface SignLayoutProps {
  children: ReactNode
  isSignin: boolean
}

const SIGNIN_SENTENCE = {
  greeting: '오늘도 만나서 반가워요!',
  guiding: '회원이 아니신가요?',
  linkName: '회원가입하기',
  linkPath: '/signup',
}

const SIGNUP_SENTENCE = {
  greeting: '첫 방문을 환영합니다!',
  guiding: '이미 가입하셨나요?',
  linkName: '로그인하기',
  linkPath: '/signin',
}

export default function SignLayout({ children, isSignin }: SignLayoutProps) {
  const messages = isSignin ? SIGNIN_SENTENCE : SIGNUP_SENTENCE
  return (
    <>
      <div className={styles['sign-layout-body']}>
        <div className={styles['container']}>
          <Link href="/">
            <div className={styles['logo-container']}>
              <div className={styles['logo-img-wrapper']}>
                <Image
                  src="/assets/large_logo.svg"
                  alt="logo"
                  className={styles['logo-img']}
                  layout="fill"
                />
              </div>
              <div className={styles['logo-title-img-wrapper']}>
                <Image
                  src="/assets/large_Taskify.svg"
                  alt="logo title"
                  className={styles['logo-title-img']}
                  layout="fill"
                />
              </div>
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
