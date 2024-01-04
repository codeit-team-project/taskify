import { useEffect, useMemo, useRef, useState } from 'react'

const useScroll = () => {
  const [Isvisible, setIsVisible] = useState(false)

  const myRef = useRef(null)

  const observer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new IntersectionObserver((entries) => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)
      })
    }
  }, [typeof window])

  useEffect(() => {
    if (myRef.current && observer !== undefined) {
      observer.observe(myRef.current)
    }
    return () => {
      if (observer !== undefined) {
        observer.disconnect()
      }
    }
  }, [myRef.current])

  return {
    Isvisible,
    setIsVisible,
    myRef,
  }
}

export default useScroll
