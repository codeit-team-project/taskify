/**
 * @TODO 구성원 컴포넌트
 * 1. 반응형 스타일링
 * 2. 삭제 기능
 * 2. 삭제 버튼 UI 공통컴포넌트화 (세컨더리 버튼) (리팩토링)
 * 3. 유저프로필 이미지
 *
 * 추후 작업
 * default size 값 확인하기
 */

import { useEffect, useState } from 'react'

import { getDashBoardMembers } from '@/api/dashBoard'
import styles from './Member.module.scss'

import Member from './Member'
import Pagination from '@/components/pagination/Pagination'
import { DashBoardMembers } from '@/types/member'

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
  }

  useEffect(() => {
    handleDashBoardMembers(START_PAGE, TEST_BOARD_ID)
  }, [])

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
