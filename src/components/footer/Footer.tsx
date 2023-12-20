import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['tag-section']}>©codeit - 2023</div>

      <div className={styles['info-section']}>
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>

      <div className={styles['address-section']}>
        <Link href="https://github.com/codeit-team-project/taskify" target="__blank">
          <Image src="assets/images/footer-msg.svg" alt="" width={22} height={22} />
        </Link>
        <Link href="https://github.com/codeit-team-project/taskify" target="__blank">
          <Image src="assets/images/footer-facebook.svg" alt="" width={22} height={22} />
        </Link>
        <Link href="https://github.com/codeit-team-project/taskify" target="__blank">
          <Image src="assets/images/footer-instar.svg" alt="" width={22} height={22} />
        </Link>
      </div>
    </footer>
  )
}
