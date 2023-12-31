/* Readonly 속성 input.

- 계정 관리 페이지에서 사용할 read only input
*/

import styles from './SignInput.module.scss'

export default function ReadonlyInput({ labelName = '', inputText = '' }) {
  return (
    <div className={styles['input-container']}>
      <label className={styles['label']}>{labelName}</label>
      <input type="text" disabled className={styles['input']} placeholder={inputText} />
    </div>
  )
}
