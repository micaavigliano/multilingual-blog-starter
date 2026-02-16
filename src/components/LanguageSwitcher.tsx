// - this is the heart of the multi-language blog. It handles the navigation and make it persistent. If the user is reading a specific blog post in English and switch to Italian, it doesn't just send them to the Italian homepage; it attempts to find the translated slug and keeps you on the same post without reloading and maintaining the application state.
// - Through the customStyles prop, a user can completely rebrand the switcher.
// - The translations prop allows the user to provide specific slug overrides for blog posts.
// - you do not need to configure if the menu opens to the left or right. The component calculates the screen and flips the alignment to ensure it never overflows the viewport.
/*
This component follows the WAI-ARIA Listbox pattern, ensuring it is fully functional for all users:
- Users can move between languages using ArrowUp and ArrowDown.
- Pressing Home or End jumps to the first or last language in the list.
- Pressing Esc immediately closes the menu and returns focus to the trigger button, preventing "focus loss."
- We use aria-live="polite" regions that are invisible to sighted users but tell screen readers: "Menu opened, 3 options available" or "Language changed to Italiano."
- The aria-expanded and aria-selected attributes update dynamically, so assistive technology always knows the current state of the UI.
For more info go to https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ (between you and me, this component is more accessible that the one provided by w3 because it handles better the edge cases with keyboard and screen readers).
*/

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { locales, localeNames, type Locale, getLocaleFromPathname } from "@/lib/i18n"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useI18n } from "@/lib/I18nProvider"
import { switcherStyles } from "@/lib/custom-styles"

type Props = {
  translations?: Partial<Record<Locale, string>>
  customStyles?: Partial<typeof switcherStyles>
}

export const LanguageSwitcher = ({ translations, customStyles }: Props) => {
  const styles = { ...switcherStyles, ...customStyles }
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [newLocaleName, setNewLocaleName] = useState("")
  const [alignment, setAlignment] = useState<'left' | 'right'>('left')

  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const { locale } = useI18n()
  const currentLocale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => { optionRefs.current = optionRefs.current.slice(0, locales.length) }, [])

  const updateFocusedIndex = (i: number) => {
    setFocusedIndex(i)
    optionRefs.current[i]?.focus()
  }

  const switchLanguage = (targetLocale:  Locale) => {
    if (targetLocale === currentLocale) {
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    setFocusedIndex(-1)
    setNewLocaleName(localeNames[targetLocale])
    buttonRef.current?.focus()

    const pathParts = pathname.split("/").filter(Boolean)
    
    const isBlogPost = pathParts.length >= 3 && pathParts[1] === "blog"

    if (isBlogPost) {
      const translatedSlug = translations?.[targetLocale] || pathParts[2]
      navigate({
        to: `/${targetLocale}/blog/${translatedSlug}`,
      })
    } else {
      pathParts[0] = targetLocale
      const targetPath = '/' + pathParts.join('/')
      navigate({
        to: targetPath,
      })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault()
        setIsOpen(true)
        const idx = Math.max(0, locales.indexOf(currentLocale))
        setTimeout(() => updateFocusedIndex(idx), 0)
      }
      return
    }

    if (event.key === "Escape") {
      event.preventDefault()
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  const handleOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        setFocusedIndex(-1)
        requestAnimationFrame(() => {
          buttonRef.current?.focus()
        })
        break
      case "ArrowDown": {
        event.preventDefault()
        const nextIndex = index < locales.length - 1 ? index + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : locales.length - 1
        updateFocusedIndex(prevIndex)
        break
      }
      case "Enter":
      case " ":
        event.preventDefault()
        switchLanguage(locales[index])
        break
      case "Home":
        event.preventDefault()
        updateFocusedIndex(0)
        break
      case "End":
        event.preventDefault()
        updateFocusedIndex(locales.length - 1)
        break
      case "Tab":
        if (event.shiftKey && index === 0) {
          event.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          buttonRef.current?.focus()
        } else if (!event.shiftKey && index === locales.length - 1) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus()
    }
  }, [isOpen, focusedIndex])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const spaceRight = window.innerWidth - rect.right
      const spaceLeft = rect.left

      if (spaceRight < 200 && spaceLeft > spaceRight) {
        setAlignment('right')
      } else {
        setAlignment('left')
      }
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          const open = !isOpen
          setIsOpen(open)
          if (open) {
            const idx = Math.max(0, locales.indexOf(currentLocale))
            setTimeout(() => updateFocusedIndex(idx), 0)
          } else {
            setFocusedIndex(-1)
          }
        }}
        onKeyDown={handleKeyDown}
        className={styles.button}
        aria-label={`${t('lang.switcher.current.lng')} ${localeNames[currentLocale]}. ${t('lang.switcher.change')}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="language-button"
        aria-controls="dropdown-listbox"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <span className={styles.buttonTextLg}>{localeNames[currentLocale]}</span>
          <span className={styles.buttonTextSm}>{currentLocale.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdown} ${alignment === 'right' ? 'right-0' : 'left-0'}`}
          role="listbox"
          aria-labelledby="language-button"
          id="dropdown-listbox"
        >
          <div className={styles.header}>
            {t("lang.switcher.select.language")}
          </div>

          {locales.map((loc, index) => {
            const isSelected = currentLocale === loc
            const isFocused = focusedIndex === index

            return (
              <button
                key={loc}
                ref={(el) => { optionRefs.current[index] = el }}
                id={`language-option-${loc}`}
                onClick={() => switchLanguage(loc)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                onMouseEnter={() => document.activeElement !== optionRefs.current[index] && setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                className={`
                  ${styles.optionBase} 
                  ${isSelected ? styles.optionSelected : styles.optionHover} 
                  ${isFocused ? styles.optionFocused : ""}
                `}
                role="option"
                aria-selected={isSelected}
                tabIndex={isFocused || isSelected ? 0 : -1}
              >
                <span className="font-medium flex-1">{localeNames[loc]}</span>
                <span className={styles.optionLangTag} aria-hidden="true">{loc}</span>
                {isSelected && <Check className="w-4 h-4 text-black shrink-0" aria-hidden="true" />}
              </button>
            )
          })}

          <div className={styles.footer}>
            {t("lang.switcher.extraInfo")}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          <p>
            {t('lang.switcher.menu.opened')}. {locales.length} {t("lang.switcher.options")}.
          </p>
        </div>
      )}
      {newLocaleName && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          <p>
            {t("lang.switcher.changed.to")} {newLocaleName}
          </p>
        </div>
      )}
    </div>
  )
}