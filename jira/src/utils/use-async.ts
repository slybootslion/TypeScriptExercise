import { useState } from "react";
import { stat } from "fs";
import { useMountedRef } from "./index";

interface State<D> {
  error: null | Error
  data: null | D
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D> (initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const config = {...defaultConfig, ...initialConfig}
  const mountedRef = useMountedRef()
  const setData = (data: D) => setState({
    data,
    error: null,
    stat: 'success'
  })

  const setError = (error: Error) => setState({
    data: null,
    error,
    stat: 'error'
  })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) throw new Error('需传入promise类型数据')

    setState({...state, stat: 'loading'})
    return promise
      .then(data => {
        if (mountedRef.current) setData(data)
        return data
      })
      .catch(err => {
        setError(err)
        if (config.throwOnError) return Promise.reject(err)
        return err
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    run,
    setError,
    setData,
    ...state
  }
}
