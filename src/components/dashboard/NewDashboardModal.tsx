/**
 * @TODO
 * 사이드바 "+" 클릭시 대시보드 생성 모달 나타남
 * /mydashboard 페이지에서 새로운 대시보드 "+" 클릭시 대시보드 생성 모달 나타남
 * 모달에서 대시보드 이름과 색을 선택해야 '생성' 버튼이 활성화
 * '생성'버튼을 누르면 대시보드가 생성이 되고 해당 대시보드 상세/boardid로 이동
 */

import classNames from 'classnames'
import styles from './NewDashboardModal.module.scss'

interface NewDashboardModalProps {
  dashBoardId: number
  onClose: () => void
}

export default function NewDashboardModal({ dashBoardId, onClose }: NewDashboardModalProps) {
  console.log(dashBoardId)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새로운 대시보드</h2>
      <div className={styles.contents}>
        <p className={styles.description}>대시보드 이름</p>
        <input className={classNames(styles.input)} />
      </div>
      <div>컬러팔레트</div>
      <div className={styles.buttons}>
        <button className={styles['default-button']} onClick={() => onClose()}>
          취소
        </button>
        <button className={classNames(styles['primary-button'])}>생성</button>
      </div>
    </div>
  )
}
