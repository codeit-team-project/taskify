/* MyNav 바 컴포넌트

TODO - 나중에 유저, 대시보드 api와 연동해 데이터를 보여줄 것
TODO - 유저 정보는 context로 관리할 것이므로 인자로 받지 않고 지금은 mock 데이터를 사용함.
- 내 대시보드, 대시보드 페이지에 들어갈 MyNav 바 컴포넌트
- 현재 위치한 대시보드 객체(옵션)를 인자로 받음
- 대시보드 객체를 인자로 받지 않으면 내 대시보드로 간주함
 */

import styles from './MyNav.module.scss'

function MyNav() {
  return (
    <nav className={styles['nav-container']}>
      <h1>MyNav</h1>
    </nav>
  )
}

export default MyNav
