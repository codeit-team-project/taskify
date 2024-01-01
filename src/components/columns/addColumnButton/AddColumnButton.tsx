import styles from './AddColumnButton.module.scss'
export default function AddColumnButton() {
  return (
    <li className={styles['button-container']}>
      <button>
        <p className={styles['button-text']}>새로운 컬럼 추가하기</p>
        <img src="/assets/icon-add-purple.png" width={24} height={24} alt="추가 버튼 이미지" />
      </button>
    </li>
  )
}
