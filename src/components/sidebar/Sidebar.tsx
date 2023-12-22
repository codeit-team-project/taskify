import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'

import styles from './Sidebar.module.scss'
import { getDashBoardList } from '@/api/dashboards/getDashboards'
import SidebarItem from './SidebarItem'

import { DASH_BOARD_DATA } from '@/mock/dashBoard' // 삭제예정
import { DashBoardListType } from '@/types/dashBoardType'
import { deleteDashBoard } from '@/api/dashboards/deleteDashboards'
import { createDashBoard } from '@/api/dashboards/createDashboards'

export default function Sidebar() {
  const { data } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: getDashBoardList,
  })

  console.log(data)

  // 5. 대시보드 삭제
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (dashBoardId: number) => deleteDashBoard(dashBoardId),
    // 대시보드 삭제 성공 시, 캐시 업데이트 (delete 요청후에 get 요청이 간것을 확인할 수 있음)
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['dashBoards'] }) // 'dashboards'는 해당 데이터 캐시 키
    // },
  })

  // 5-1. 버튼 누르면 대시보드 삭제하는 이벤트 핸들러
  const handleDeleteDashBoard = () => {
    try {
      deleteMutation(21)
    } catch (error) {
      console.log(error)
    }
  }

  // 1. 대시보드 생성하기
  const { mutate } = useMutation({
    mutationFn: createDashBoard,
    onSuccess: (data) => {
      // 성공했을때 실행할 콜백
      console.log(data)
    },
  })

  // 1-1. 버튼 누르면 대시보드 생성하는 이벤트 핸들러
  const handleCreateDashBoard = () => {
    mutate({ title: '개발 일정', color: '#7AC555' })
  }

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        {/* <button onClick={handleCreateDashBoard}>생성</button> */}
        {/* <button onClick={handleDeleteDashBoard}>삭제</button> */}
        <Image src="assets/large_logo.svg" alt="로고" width={29} height={34} priority />
        <Image
          src="assets/large_Taskify.svg"
          className={styles['logo-text']}
          alt="로고"
          width={80}
          height={22}
          priority
        />
      </div>
      <div className={styles['title-wrapper']}>
        <span className={styles.title}>Dash Boards</span>
        <button className={styles.action}>
          <Image src="assets/add_box.svg" alt="대시보드 추가하기 버튼" fill />
        </button>
      </div>
      <div>
        {data?.dashboards.map((board) => (
          <li key={board.id} className={styles.menus}>
            <SidebarItem board={board} />
          </li>
        ))}
      </div>
    </section>
  )
}
