/**
 * @TODO 구성원 컴포넌트
 * 구성원 리스트를 mock 데이터로 만들어서 UI 그리기
 * api와 연동하기 (대시보드 멤버 목록 조회 api - boardId 필요)
 * page 처리
 * 대시보드 멤버 삭제 api 연동
 *
 * 리팩토링 및 기타 점검
 * 스타일링 - 반응형까지
 * 멤버 목록 공통 컴포넌트로 분리 (리팩토링)
 * 페이지네이션 공통 컴포넌트 분리, 공통 로직 분리 (리팩토링)
 * 페이징 버튼 공통컴포넌트화 (리팩토링)
 *
 * 추후 작업
 * default size 값 확인하기
 */

/**
 * sohyun@taskify.com
 * aaaaaaaa11
 * 대시보드 아이디 : 21
 * 유저 아이디 : 45
 * id : 27
 */

import { createDashBoard, getDashBoardMembers } from '@/api/dashBoard'
import { DASHBOARD_MEMBERS } from '@/mock/members'
import { useState } from 'react'

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
    <>
      <button onClick={createDashBoard}>대시보드 생성</button>
      <button onClick={handleDashBoardMembers}>대시보드 멤버 보기</button>
      <button onClick={handlePrevPage}>
        <img src="arrow_forward.svg" alt="구성원보기" />
      </button>
      <button onClick={handleNextPage}>
        <img src="arrow_next.svg" alt="구성원보기" />
      </button>
      {DASHBOARD_MEMBERS.members.map((member) => (
        <li key={member.id}>
          {/* <img src={member.profileImageUrl} alt="프로필 사진" /> */}
          <span>{member.nickname}</span>
        </li>
      ))}
    </>
  )
}
