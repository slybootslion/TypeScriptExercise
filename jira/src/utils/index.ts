import { useEffect, useRef, useState } from "react";

export const useDebounce = <V> (value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const isVoid = (value: unknown) => value == null || value === ''

export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {}
  }
  const result = {...object}
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) delete result[key]
  })
  return result
}

export const useMount = (cb: () => void) => {
  // eslint-disable-next-line
  useEffect(() => cb(), [])
}

export const resetRoute = () => window.location.href = window.location.origin

export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
