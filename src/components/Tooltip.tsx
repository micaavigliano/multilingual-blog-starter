import React, { useState, useEffect } from "react"
import type { ReactNode } from "react"

interface TooltipProps {
  text: string
  children: ReactNode
  direction: "top" | "bottom" | "left" | "right"
  id: string
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, direction, id }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const tooltipOn = () => {
    setShowTooltip(true)
  }

  const tooltipOff = () => {
    setShowTooltip(false)
  }

  const closeTooltip = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      setShowTooltip(false)
    }
  }

  const getTooltipStyle = () => {
    const tooltipStyle = {
      [direction === "left" ? "right" : "left"]: "100%",
      [direction === "top" || direction === "bottom"
        ? "marginLeft"
        : "marginTop"]: "7%",
    }

    return tooltipStyle
  }

  useEffect(() => {
    document.addEventListener("keydown", closeTooltip)

    return () => {
      document.removeEventListener("keydown", closeTooltip)
    }
  }, [])

  return (
    <div
      className="relative inline-block justify-center text-center"
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      onFocus={tooltipOn}
      onBlur={tooltipOff}
    >
      {showTooltip && (
        <div
          className={`bg-black text-white text-center rounded p-3 absolute z-10 transition-opacity duration-300 ease-in-out w-fit outline outline-offset-0 ${direction === "top"
            ? "bottom-[calc(100%+1px)] left-10 transform translate-x-[-60%] mb-2"
            : ""
            }
          ${direction === "bottom"
              ? "top-[calc(100%+1px)] left-10 transform translate-x-[-60%] mt-2"
              : ""
            }
          ${direction === "left"
              ? "-left-30 top-1/2 transform -translate-y-1/2 mr-2 w-1/2"
              : ""
            }
          ${direction === "right"
              ? "-right-100 top-1/2 transform -translate-y-1/2 ml-2"
              : ""
            }`}
          data-placement={direction}
          role="tooltip"
          aria-hidden="true"
          id={id}
          style={getTooltipStyle()}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip