import styles from './NodataUI.module.scss'

interface NodataUIProps {
  text: string
}

export default function NodataUI({ text }: NodataUIProps) {
  return (
    <div className={styles['no-invitation-container']}>
      <img
        className={styles['no-invitation-icon']}
        src="/assets/icon-no-invitation.png"
        width="100px"
        height="100px"
        alt="초대받은 대시보드가 없을 때 아이콘 이미지"
      />
      <p className={styles['no-invitation-text']}>{text}</p>
    </div>
  )
}
