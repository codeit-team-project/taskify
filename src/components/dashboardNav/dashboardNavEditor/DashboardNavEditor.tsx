/* DashboardNavEditor 컴포넌트

TODO - 나중에 시간 되면 멤버 사진 누르면 멤버 리스트가 드롭다운으로 나오는 기능 구현할 것.
- 불린형 인자 isOwner 받고 true라면 내가 만든 대시보드 페이지에 있는 것으로 해석해 관리 버튼을 렌더링
- 숫자형 인자 boardId 받고 관리 버튼을 누를 시 해당 id의 edit page로 이동하게 함
 */

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'

import { getDashBoardMembers } from '@/api/members/getMembers'
import InvitationModal from '@/components/invitations/InvitationModal'
import useDropdown from '@/hooks/useDropdown'
import { DashBoardMembers } from '@/types/members'
import styles from './DashboardNavEditor.module.scss'
import RandomProfile from '@/components/randomProfile/RandomProfile'
import ModalContainer from '@/components/dashboardModal/ModalContainer'
import FloatingButton from '../floatingButton/FloatingButton'

interface DashboardNavEditorProps {
  isOwner?: boolean
  boardId: number
}

export default function DashboardNavEditor({ isOwner = false, boardId }: DashboardNavEditorProps) {
  const [windowSize, setWindowSize] = useState(0)
  const [isVisible, handleOpenModal, handleCloseModal] = useDropdown()

  const { data: memberData } = useQuery<DashBoardMembers>({
    queryKey: ['dashBoardMembers', boardId],
    queryFn: () => getDashBoardMembers(boardId),
    retry: 1,
    staleTime: 2000,
    enabled: !!boardId,
  })

  const handleView = () => {
    if (typeof window === undefined) setWindowSize(0)
    else {
      setWindowSize(window.innerWidth)
    }
  }

  useEffect(() => {
    handleView()
    window.addEventListener('resize', handleView)
    return () => window.removeEventListener('resize', handleView)
  }, [])

  return (
    <>
      {isVisible &&
        createPortal(
          <ModalContainer onClose={handleCloseModal}>
            <InvitationModal dashBoardId={boardId} onClose={handleCloseModal} />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}

      <div className={styles['editor-section']}>
        <div className={styles['button-section']}>
          {isOwner && (
            <button className={styles['button']}>
              <Link
                href={
                  memberData
                    ? `/dashboard/${String(boardId)}/edit`
                    : `/dashboard/${String(boardId)}`
                }
              >
                <Image src="/assets/settingIcon.svg" alt="setting icon" width={20} height={20} />
                관리
              </Link>
            </button>
          )}
          <button
            disabled={memberData ? false : true}
            onClick={handleOpenModal}
            className={styles['button']}
          >
            <Image src="/assets/addIcon.svg" alt="add icon" width={20} height={20} />
            초대하기
          </button>
        </div>
        <FloatingButton boardId={boardId} onOpen={handleOpenModal} />
        {memberData && (
          <div className={styles['members-section']}>
            {windowSize > 744 ? (
              <div
                key={boardId}
                className={styles['member-img-list']}
                style={{
                  width: `${memberData.totalCount >= 5 ? 17 : memberData.totalCount * 3 + 2}rem`,
                }}
              >
                {memberData.members.slice(0, 4).map((member) => {
                  if (member) {
                    return (
                      <>
                        {member.profileImageUrl ? (
                          <Image
                            key={member.id}
                            src={member.profileImageUrl}
                            alt="profile"
                            width={36}
                            height={36}
                            className={styles['member-img']}
                          />
                        ) : (
                          <RandomProfile size={36} key={member.id} email={member.email} />
                        )}
                      </>
                    )
                  }
                })}
                {memberData.totalCount > 4 && (
                  <div className={styles['rest-member-img']}>+{memberData.totalCount - 4}</div>
                )}
              </div>
            ) : (
              <div
                className={styles['member-img-list']}
                style={{
                  width: `${memberData.totalCount >= 3 ? 10 : memberData.totalCount * 3 + 2}rem`,
                }}
              >
                {memberData.members.slice(0, 2).map((member) => {
                  if (member) {
                    return (
                      <>
                        {member.profileImageUrl ? (
                          <Image
                            key={member.id}
                            src={member.profileImageUrl}
                            alt="profile"
                            width={36}
                            height={36}
                            className={styles['member-img']}
                          />
                        ) : (
                          <RandomProfile size={36} key={member.id} email={member.email} />
                        )}
                      </>
                    )
                  }
                })}
                {memberData.totalCount > 2 && (
                  <div className={styles['rest-member-img']}>+{memberData.totalCount - 2}</div>
                )}
              </div>
            )}
            <div key={`${windowSize}space`} className={styles['spacing-bar']}></div>
          </div>
        )}
      </div>
    </>
  )
}
