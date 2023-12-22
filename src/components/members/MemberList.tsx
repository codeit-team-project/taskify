/**
 * @TODO 구성원 컴포넌트
 * 1. 반응형 스타일링
 * 2. 삭제 기능
 * 2. 삭제 버튼 UI 공통컴포넌트화 (세컨더리 버튼) (리팩토링)
 * 3. 유저프로필 이미지
 * 4. router path로 /dashboard/boardid/edit 페이지에서 대시보드 아이디 받기
 *
 * 추후 작업
 * default size 값 확인하기
 */

import { QueryClient, useQuery } from '@tanstack/react-query'
import styles from './Member.module.scss'

import { getDashBoardMembers } from '@/api/members/getMembers'
import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { DashBoardMembers } from '@/types/members'
import { DashBoardListType } from '@/types/dashBoardType'

import Pagination from '@/components/pagination/Pagination'
import Member from './Member'

interface MomberListProps {
  dashBoardId: number
}

export default function MemberList({ dashBoardId = 116 }: MomberListProps) {
  // const [memberList, setMemberList] = useState<DashBoardMembers[]>()
  // const [memberCount, setMemberCount] = useState(0)

  // // react-query 사용하면 useEffect 지우고, handleDashBoardMembers 수정
  // const handleDashBoardMembers = async (page: number, id = TEST_BOARD_ID) => {
  //   const data = await getDashBoardMembers({ page, id })
  //   const { members, totalCount }: DashBoardAPIType = data
  //   setMemberList(members)
  //   setMemberCount(totalCount)
  // }

  //

  const queryClient = new QueryClient()
  queryClient.prefetchQuery

  // 2. 대시보드 목록조회
  const { data: dashBoardList } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: getDashBoardList,
  })
  console.log(dashBoardList)

  const { data } = useQuery<DashBoardMembers>({
    queryKey: ['dashBoardMembers', dashBoardId],
    queryFn: () => getDashBoardMembers(dashBoardId),
  })

  console.log(data)

  return (
    <section className={styles.container}>
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <div className={styles['card-action']}>
          <span className={styles.pages}>1 페이지 중 1</span>
          <Pagination count={data ? data?.totalCount : 0} />
        </div>
      </div>
      <h3 className={styles['sub-title']}>이름</h3>
      <div>
        {data?.members.map((member) => (
          <li key={member.id} className={styles.table}>
            <Member nickname={member.nickname} />
          </li>
        ))}
      </div>
    </section>
  )
}
