import Image from 'next/image'
import styles from './MainNav.module.scss'
import Link from 'next/link'

function MainNav({ theme = 'light' }) {
  return (
    <nav className={styles['nav-container']} data-theme={theme}>
      <div className={styles['logo-container']}>
        <Link href="/">
          <Image src="images/logo.svg" width={29} height={34} alt="logo icon" />
          <Image
            src="images/logoTitle.svg"
            className={styles['logo-title']}
            width={80}
            height={22}
            alt="logo icon"
          />
        </Link>
      </div>
      <div className={styles['button-container']}>
        <button className={styles['button']}>
          <Link href="/signin">로그인</Link>
        </button>
        <button className={styles['button']}>
          <Link href="/signup">회원가입</Link>
        </button>
      </div>
    </nav>
  )
}

export default MainNav
