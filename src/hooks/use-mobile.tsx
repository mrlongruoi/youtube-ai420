import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Hook that indicates whether the viewport should be treated as mobile.
 *
 * The returned value updates when the viewport crosses the mobile breakpoint.
 *
 * @returns `true` if the viewport width is less than `MOBILE_BREAKPOINT`, `false` otherwise.
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