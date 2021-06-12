import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const clearObj = (obj: object) => {
  const result = {...obj}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    // @ts-ignore
    if (isFalsy(value)) delete result[key]
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value: unknown, delay = 2000): any => {
  const [dValue, setDValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return dValue
}
