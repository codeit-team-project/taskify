import Image from 'next/image'
import { useRouter } from 'next/router'

import HomeLayout from '@/components/ui/layout/HomeLayout'
import styles from './Homepage.module.scss'
import StyledDescription from '@/components/styledDescription/StyledDescription'

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

        <section className={styles.section}>
          <article>
            <h3>Point 1</h3>
            <p>
              일의 우선순위를 <br />
              관리하세요
            </p>
          </article>
          <div className={styles['img-1']}>
            <Image
              src="/assets/homeImgs/img1.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </section>

        <section className={styles.section}>
          <article className={styles.article}>
            <h3>Point 2</h3>
            <p>
              해야 할 일을 <br />
              등록하세요
            </p>
          </article>
          <div className={styles['img-2']}>
            <Image
              src="/assets/homeImgs/img2.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </section>

        <footer className={styles.footer}>
          <h2>생산성을 높이는 다양한 설정들</h2>
          <section>
            <StyledDescription
              title="대시보드 설정"
              description="대시보드 사진과 이름을 변경할 수 있어요."
            >
              <div className={styles.container}>
                <Image
                  src="/assets/homeImgs/img11.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '80%', height: 'auto' }}
                />
              </div>
            </StyledDescription>

            <StyledDescription title="초대" description="새로운 팀원을 초대할 수 있어요.">
              <div>
                <Image
                  src="/assets/homeImgs/img2.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '55%', height: 'auto' }}
                />
              </div>
            </StyledDescription>

            <StyledDescription title="구성원" description="구성원을 초대하고 내보낼 수 있어요.">
              <div className={styles.container}>
                <Image
                  src="/assets/homeImgs/img33.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '60%', height: 'auto' }}
                />
              </div>
            </StyledDescription>
          </section>
        </footer>
      </div>
    </HomeLayout>
  )
}
