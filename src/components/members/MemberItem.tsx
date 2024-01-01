import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './Member.module.scss'

import { Members } from '@/types/members'
import { deleteDashBoardMember } from '@/api/members/deleteMembers'

import RandomProfile from '@/components/randomProfile/RandomProfile'

interface MemberItemProps {
  dashBoardId: number
  member: Members
}

export default function MemberItem({ dashBoardId, member }: MemberItemProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['deleteMember'],
    mutationFn: (memberId: number) => deleteDashBoardMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardMembers', dashBoardId] })
    },
  })

  const handleDeleteMember = (id: number) => () => {
    mutate(id)
  }

  return (
    <>
      <div className={styles['name-wrapper']}>
        {member.profileImageUrl ? (
          <div className={styles.profile}>
            <Image src={member.profileImageUrl} alt="profile" fill className={styles.img} />
          </div>
        ) : (
          <RandomProfile size={38} email={member.email} />
        )}
        <span className={styles.nickname}>{member.nickname}</span>
      </div>
      {!member.isOwner && (
        <button className={styles['member-button']} onClick={handleDeleteMember(member.id)}>
          삭제
        </button>
      )}
    </>
  )
}
