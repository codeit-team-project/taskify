/**
 * 최초 마운트 렌더링 시를 제외하고, 이후에는 useEffect처럼 동작합니다.
 * func: useEffect의 콜백 함수
 * deps: useEffect의 의존성 배열
 * ex) useDidMountEffect(() => {callback()}, [value])
 */
import { useEffect, useRef, DependencyList } from 'react'

type EffectFunction = () => void

const useDidMountEffect = (func: EffectFunction, deps: DependencyList): void => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useDidMountEffect
