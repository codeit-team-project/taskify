/**
 * 연속 이벤트 발생 시 마지막 이벤트만 유효화하고 나머지는 무시
 * value: 디바운싱을 적용할 값
 * delay: 디바운싱의 지연 시간 (밀리초 단위)
 * ex) debouncedValue = useDebounce(originalValue, 1000)
 */
import { useEffect, useState } from 'react'

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return debouncedValue
}
