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
import { useEffect, useState } from 'react'

import { getDashBoardMembers } from '@/api/dashBoard'
// import { DASHBOARD_MEMBERS } from '@/mock/members'

import styles from './Member.module.scss'

import Member from './Member'
import { DashBoardMembers } from '@/types/member'
import Pagination from '@/components/pagination/Pagination'

// api 연동 후 삭제 예정
const TEST_BOARD_ID = 21
const START_PAGE = 1

interface DashBoardAPIType {
  members: DashBoardMembers[]
  totalCount: number
}

export default function MemberList() {
  const [memberList, setMemberList] = useState<DashBoardMembers[]>()
  const [memberCount, setMemberCount] = useState(0)

  // react-query 사용하면 useEffect 지우고, handleDashBoardMembers 수정
  const handleDashBoardMembers = async (page: number, id = TEST_BOARD_ID) => {
    const data = await getDashBoardMembers({ page, id })
    const { members, totalCount }: DashBoardAPIType = data
    setMemberList(members)
    setMemberCount(totalCount)
    console.log(data) // 삭제 예정
  }

  useEffect(() => {
    handleDashBoardMembers(START_PAGE, TEST_BOARD_ID)
  }, [])

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
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <div className={styles['card-action']}>
          <span className={styles.pages}>1 페이지 중 1</span>
          <Pagination count={memberCount} handleDashBoardMembers={handleDashBoardMembers} />
        </div>
      </div>
      <h3 className={styles['sub-title']}>이름</h3>
      <div>
        {memberList?.map((member) => (
          <li key={member.id} className={styles.table}>
            <Member nickname={member.nickname} />
          </li>
        ))}
      </div>
    </section>
  )
}
