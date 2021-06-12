import { useEffect, useState } from 'react'

export const isFalsy = value => value === 0 ? false : !value

export function clearObj (obj) {
  const result = { ...obj }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) delete result[key]
  })
  return result
}

export const useMount = callback => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay = 2000) => {
  const [dValue, setDValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return dValue
}
