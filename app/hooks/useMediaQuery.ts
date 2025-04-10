import { useState, useEffect } from 'react'

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  // Use a separate state to track if we're mounted on client
  const [mounted, setMounted] = useState(false)

  // Get matches, but return defaultValue on server
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    // On initial server render, always use defaultValue to prevent hydration mismatch
    if (IS_SERVER || !initializeWithValue) {
      return defaultValue
    }
    return getMatches(query)
  })

  // Handle the change event of the media query
  function handleChange() {
    setMatches(getMatches(query))
  }

  // First effect: track mounting state to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Second effect: handle media query
  useEffect(() => {
    // Skip this effect on server
    if (!mounted) return

    const matchMedia = window.matchMedia(query)

    // Set initial value after mounting to ensure client-side only execution
    handleChange()

    // Use modern event listener with fallback for older browsers
    try {
      matchMedia.addEventListener('change', handleChange)
      return () => matchMedia.removeEventListener('change', handleChange)
    } catch (e) {
      // Fallback for Safari < 14 and older browsers
      matchMedia.addListener(handleChange)
      return () => matchMedia.removeListener(handleChange)
    }
  }, [query, mounted])

  // If we haven't mounted yet (first client render hasn't completed),
  // return the defaultValue to match SSR output and prevent hydration mismatch
  return mounted ? matches : defaultValue
}