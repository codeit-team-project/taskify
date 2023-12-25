/* 로딩 스피너 컴포넌트

TODO - 팀원들과 어떻게 스피너 구현해볼지 얘기해보기.
TODO - 나중에 라이브러리를 사용하는 방법도 생각해볼 것.
 */

import Image from 'next/image'
import styles from './LoadingSpinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles['spinner-body']}>
      <div className={styles['spinner-container']}>
        <Image
          src="assets/Spinner-1s-200px.gif"
          unoptimized={true}
          width={200}
          height={200}
          alt="is loading..."
        />
      </div>
    </div>
  )
}
