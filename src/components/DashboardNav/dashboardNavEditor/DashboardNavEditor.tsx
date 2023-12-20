/* DashboardNavEditor 컴포넌트

TODO - member type을 만들고 members 인자를 any에서 member[] 타입으로 바꿔줄 것.
TODO - 나중에 시간 되면 멤버 사진 누르면 멤버 리스트가 드롭다운으로 나오는 기능 구현할 것.
- DashboardNav 바 컴포넌트의 왼쪽에 들어갈 관리 버튼, 초대하기 버튼, 멤버이미지
- 불린형 인자 isOwner 받고 true라면 내가 만든 대시보드 페이지에 있는 것으로 해석해 관리 버튼을 렌더링
- 숫자형 인자 boardId 받고 관리 버튼을 누를 시 해당 id의 edit page로 이동하게 함
- members 배열이 담긴 members 인자를 받고 멤버 프로필을 렌더링
 */

import Image from 'next/image'
import Link from 'next/link'
import styles from './DashboardNavEditor.module.scss'
import MemberType from '@/types/MemberType'
import { useEffect, useState } from 'react'

export default function DashboardNavEditor({
  isOwner = false,
  boardId = 1,
  members = null,
}: {
  isOwner?: boolean
  boardId?: number
  members?: { members: MemberType[]; totalCount: number } | null
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const handleView = () => {
    setWindowSize(window.innerWidth)
  }
  useEffect(() => {
    handleView()
    window.addEventListener('resize', handleView)
    return () => window.removeEventListener('resize', handleView)
  }, [])

  return (
    <div className={styles['editor-section']}>
      <div className={styles['button-section']}>
        {isOwner && (
          <Link href={`/dashboard/${String(boardId)}/edit`}>
            <button className={styles['button']}>
              <Image src="assets/settingIcon.svg" alt="setting icon" width={20} height={20} />
              관리
            </button>
          </Link>
        )}
        <button className={styles['button']}>
          <Image src="assets/addIcon.svg" alt="add icon" width={20} height={20} />
          초대하기
        </button>
      </div>
      {members && (
        <div className={styles['members-section']}>
          {windowSize > 744 ? (
            <div
              className={styles['member-img-list']}
              style={{ width: `${members.totalCount >= 5 ? 14 : members.totalCount * 3}rem` }}
            >
              {members.members.map((member, ind) => {
                if (ind <= 3) {
                  return (
                    <Image
                      key={member.id}
                      src={member.profileImageUrl}
                      alt="profile"
                      width={36}
                      height={36}
                      className={styles['member-img']}
                    />
                  )
                }
              })}
              {members.totalCount > 4 && (
                <div className={styles['rest-member-img']}>+{members.totalCount - 4}</div>
              )}
            </div>
          ) : (
            <div
              className={styles['member-img-list']}
              style={{ width: `${members.totalCount >= 3 ? 10 : members.totalCount * 3}rem` }}
            >
              {' '}
              {members.members.map((member, ind) => {
                if (ind <= 1) {
                  return (
                    <Image
                      key={member.id}
                      src={member.profileImageUrl}
                      alt="profile"
                      width={36}
                      height={36}
                      className={styles['member-img']}
                    />
                  )
                }
              })}
              {members.totalCount > 2 && (
                <div className={styles['rest-member-img']}>+{members.totalCount - 2}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
