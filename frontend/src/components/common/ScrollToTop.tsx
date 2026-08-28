import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** 라우트 이동 시 스크롤을 맨 위로. 해시(#id)가 있으면 해당 위치로 이동한다. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
