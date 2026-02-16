import { useEffect, useRef } from 'react'
import { useLocation } from '@tanstack/react-router'

const FocusMain = () => {
  const location = useLocation()
  // when the location changes, the focus goes directly to the h1 element. This is important because the screen reader users has to know when the context of the page changes. Also, keyboard users have to have full control of the focus when the context changes. This is one of the main functionalities of the heading h1.
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the focus logic on the very first mount
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      const title = document.querySelector('h1')
      
      if (title) {
        title.setAttribute('tabindex', '-1')
        title.focus({ preventScroll: true }) // Added preventScroll for smoother UX
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return null
}

export default FocusMain