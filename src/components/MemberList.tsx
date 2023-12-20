/**
 * @TODO 구성원 컴포넌트
 * 구성원 리스트를 mock 데이터로 만들어서 UI 그리기
 * api와 연동하기 (대시보드 멤버 목록 조회 api - boardId 필요)
 * page 처리
 * 대시보드 멤버 삭제 api 연동
 *
 * 리팩토링 및 기타 점검
 * 스타일링 - 반응형까지
 * 멤버 목록 공통 컴포넌트로 분리 (리팩토링) (완료)
 * 페이지네이션 공통 컴포넌트 분리, 공통 로직 분리 (리팩토링)
 * 페이징 버튼 공통컴포넌트화 (리팩토링)
 * 삭제 버튼 UI 공통컴포넌트화 (세컨더리 버튼) (리팩토링)
 *
 * 추후 작업
 * default size 값 확인하기
 */

import { getDashBoardMembers } from '@/api/dashBoard'
import { DASHBOARD_MEMBERS } from '@/mock/members'
import { useState } from 'react'
import styles from './members/Member.module.scss'
import Member from './Member'

export default function MemberList() {
  //   const [currentPage, setCurrentPage] = useState(1)
  const [startPage, setStartPage] = useState(1)

  const lastPage =
    DASHBOARD_MEMBERS.totalCount !== null ? Math.ceil(DASHBOARD_MEMBERS.totalCount / 2) : 0

  const handleDashBoardMembers = ({ page, id = 21 }: any) => {
    getDashBoardMembers({ page, id })
  }

  const handlePrevPage = () => {
    if (startPage === 1) return
    setStartPage((prev) => prev - 1)
    getDashBoardMembers({ page: startPage - 1, id: 21 })
  }

  const handleNextPage = () => {
    if (startPage === lastPage) return
    setStartPage((prev) => prev + 1)
    getDashBoardMembers({ page: startPage + 1, id: 21 })
  }

  /**
   * 마지막 페이지를 계산한다 (완료)
   * prev 화살표를 누르면 page -1이 호출된다 (완료)
   * next 화살표를 누르면 page +1이 호출된다 (완료)
   * 누를때마다 페이지, 사이즈 정보를 담은 쿼리스트링으로 api를 호출한다 (완료)
   * 만약 요청한 페이지가 마지막 페이지이면 더이상 호출 못하게 한다 (완료)
   * 만약 요청한 페이지가 1페이지라면 더이상 앞으로 호출 못하게 한다 (완료)
   * ㄴ 스타일상으로도 디폴트 처리한다
   */

  return (
    <section className={styles.container}>
      {/* <button onClick={handleDashBoardMembers}>대시보드 멤버 보기</button> */}
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <div className={styles['card-action']}>
          <span className={styles.pages}>1 페이지 중 1</span>
          <div>
            <button onClick={handlePrevPage} className={styles['left-arrow-button']}>
              <img src="arrow_forward.svg" alt="구성원보기" />
            </button>
            <button onClick={handleNextPage} className={styles['right-arrow-button']}>
              <img src="arrow_next.svg" alt="구성원보기" />
            </button>
          </div>
        </div>
      </div>
      <h3 className={styles['sub-title']}>이름</h3>
      <div>
        {DASHBOARD_MEMBERS.members.map((member) => (
          <li key={member.id} className={styles.table}>
            <Member nickname={member.nickname} />
          </li>
        ))}
      </div>
    </section>
  )
}
