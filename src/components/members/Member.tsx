import styles from './Member.module.scss'

interface MemberProps {
  nickname: string
}

export default function Member({ nickname }: MemberProps) {
  return (
    <>
      <div className={styles['name-wrapper']}>
        {/* 이미지 컴포넌트 구현예정 */}
        <img src="circle.svg" />
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <button className={styles['member-button']}>삭제</button>
    </>
  )
}
