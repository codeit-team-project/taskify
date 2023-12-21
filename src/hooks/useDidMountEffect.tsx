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
