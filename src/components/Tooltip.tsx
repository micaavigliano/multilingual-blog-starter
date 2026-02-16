import { useState, useEffect } from "react"
import type { ReactNode } from "react"

export const tooltipStyles = {
  container: "bg-black text-white text-center rounded p-3 absolute z-10 transition-opacity duration-300 ease-in-out w-max max-w-xs shadow-xl",
  wrapper: "relative inline-block",
}

interface TooltipProps {
  text: string
  children: ReactNode
  direction: "top" | "bottom" | "left" | "right"
  id?: string
  customStyles?: Partial<typeof tooltipStyles>
}

const Tooltip = ({ text, children, direction, id, customStyles }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const styles = { ...tooltipStyles, ...customStyles }

  const tooltipOn = () => setShowTooltip(true)
  const tooltipOff = () => setShowTooltip(false)

  useEffect(() => {
    const closeTooltip = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setShowTooltip(false)
      }
    }

    if (showTooltip) {
      document.addEventListener("keydown", closeTooltip)
    }
    
    return () => {
      document.removeEventListener("keydown", closeTooltip)
    }
  }, [showTooltip])

  const getDirectionClasses = () => {
    if (direction === "top") return "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 mb-2"
    if (direction === "bottom") return "top-[calc(100%+8px)] left-1/2 -translate-x-1/2 mt-2"
    if (direction === "left") return "right-[calc(100%+8px)] top-1/2 -translate-y-1/2 mr-2"
    if (direction === "right") return "left-[calc(100%+8px)] top-1/2 -translate-y-1/2 ml-2"

    return ""
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      onFocus={tooltipOn}
      onBlur={tooltipOff}
    >
      {showTooltip && (
        <div
          id={id}
          role="tooltip"
          className={`${styles.container} ${getDirectionClasses()}`}
          aria-hidden="true" 
        >
          {text}
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip