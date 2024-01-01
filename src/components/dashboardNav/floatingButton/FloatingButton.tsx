import Link from 'next/link'
import Image from 'next/image'
import useDropdown from '@/hooks/useDropdown'
import styles from './FloatingButton.module.scss'

interface FloatingProps {
  boardId: number
  onOpen: any
}

function FloatingMenu({ boardId, onOpen }: FloatingProps) {
  return (
    <div className={styles['button-container']}>
      <button className={styles['button']}>
        <Link href={`/dashboard/${String(boardId)}/edit`}>
          <Image src="/assets/images/settingIcon.svg" alt="setting icon" width={18} height={18} />{' '}
          관리
        </Link>
      </button>
      <button onClick={onOpen} className={styles['button']}>
        <Image src="/assets/images/addIcon.svg" alt="add icon" width={20} height={20} /> 초대하기
      </button>
    </div>
  )
}

export default function FloatingButton({ boardId, onOpen }: FloatingProps) {
  const [isVisible, setHandleOpenDropdown, setHandleCloseDropdown] = useDropdown()

  return (
    <>
      {isVisible && <FloatingMenu boardId={boardId} onOpen={onOpen} />}
      <button
        className={styles.floating}
        onClick={setHandleOpenDropdown}
        onBlur={setHandleCloseDropdown}
        data-show={isVisible}
      >
        +
      </button>
    </>
  )
}
