import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const clearObj = (obj: { [key: string]: unknown }) => {
  if (!obj) return {}
  const result = {...obj}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) delete result[key]
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V> (value: V, delay = 2000) => {
  const [dValue, setDValue] = useState<V>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return dValue
}
