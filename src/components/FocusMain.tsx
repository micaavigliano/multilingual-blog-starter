// when the location changes, the focus goes directly to the h1 element. This is important because the screen reader users has to know when the context of the page changes. Also, keyboard users have to have full control of the focus when the context changes. This is one of the main functionalities of the heading h1.

import { useEffect, useRef } from 'react'
import { useLocation } from '@tanstack/react-router'

const FocusMain = () => {
  const location = useLocation()
  const isInitialLoad = useRef(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isInitialLoad.current) {
        const firstInteractive = document.querySelector('a, button, [tabindex="0"]') as HTMLElement
        
        if (firstInteractive) {
          firstInteractive.focus({ preventScroll: true })
        }
        
        isInitialLoad.current = false
      } else {
        const title = document.querySelector('h1')
        
        if (title) {
          title.setAttribute('tabindex', '-1')
          title.focus({ preventScroll: true })
        }
      }
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return null
}

export default FocusMain