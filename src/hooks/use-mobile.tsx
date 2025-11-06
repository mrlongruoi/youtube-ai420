import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Determines whether the current viewport should be considered mobile.
 *
 * Subscribes to viewport width changes and updates the value when the width crosses the mobile breakpoint.
 *
 * @returns `true` if the current viewport width is less than `MOBILE_BREAKPOINT`, `false` otherwise.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}