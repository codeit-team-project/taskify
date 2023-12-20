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

export default function MemberList() {
  const handleDashBoardMembers = () => {
    getDashBoardMembers({ id: 21 })
  }
  return (
    <>
      <button onClick={createDashBoard}>대시보드 생성</button>
      <button onClick={handleDashBoardMembers}>대시보드 멤버 보기</button>
      {DASHBOARD_MEMBERS.members.map((member) => (
        <li key={member.id}>
          {/* <img src={member.profileImageUrl} alt="프로필 사진" /> */}
          <span>{member.nickname}</span>
        </li>
      ))}
    </>
  )
}
