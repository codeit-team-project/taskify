import HomeLayout from '@/components/ui/layout/HomeLayout'
import styles from './Homepage.module.scss'

export default function Home() {
  return (
    <HomeLayout>
      <div>
        <header>
          <div></div>
          <h1>
            새로운 일정 관리 <span>Taskify</span>
          </h1>
          <div>센스있게 일정을 관리해보세요!</div>
          <button>로그인하기</button>
        </header>

        <section>
          <div>
            <h3>Point 1</h3>
            <div>
              일의 우선순위를 <br />
              관리하세요
            </div>
          </div>
          <div></div>
        </section>

        <section>
          <div></div>
          <div>
            <h3>Point 2</h3>
            <div>
              해야 할 일을 <br />
              등록하세요
            </div>
          </div>
        </section>

        <section>
          <h2>생산성을 높이는 다양한 설정</h2>
          <article>
            <div>
              <div></div>
              <div>
                <h3>대시보드 설정</h3>
                <div>대시보드 사진과 이름을 변경할 수 있어요.</div>
              </div>
            </div>

            <div>
              <div></div>
              <div>
                <h3>초대</h3>
                <div>새로운 인원을 초대할 수 있어요.</div>
              </div>
            </div>

            <div>
              <div></div>
              <div>
                <h3>구성원</h3>
                <div>구성원을 초대하고 내보낼 수 있어요.</div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </HomeLayout>
  )
}
