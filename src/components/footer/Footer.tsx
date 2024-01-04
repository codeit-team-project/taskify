/*Footer 컴포넌트*/

import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'

const SNS_CATEGORY = [
  {
    name: 'github',
    imgSrc: '/assets/images/footer-msg.svg',
    link: 'https://github.com/codeit-team-project/taskify',
  },
  {
    name: 'facebook',
    imgSrc: '/assets/images/footer-facebook.svg',
    link: 'https://github.com/codeit-team-project/taskify',
  },
  {
    name: 'instargram',
    imgSrc: '/assets/images/footer-instargram.svg',
    link: 'https://github.com/codeit-team-project/taskify',
  },
]

export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['tag-section']}>©codeit - 2023</div>

      <div className={styles['info-section']}>
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>

      <div className={styles['address-section']}>
        {SNS_CATEGORY.map((sns) => {
          return (
            <Link href={sns.link} target="__blank" key={sns.name}>
              <Image src={sns.imgSrc} alt={sns.name} width={22} height={22} />
            </Link>
          )
        })}
      </div>
    </footer>
  )
}
