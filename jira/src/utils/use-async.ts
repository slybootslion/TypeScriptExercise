import { useCallback, useReducer } from "react";
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

const useSafeDispatch = <T> (dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => mountedRef.current ? dispatch(...args) : void 0, [dispatch, mountedRef])
}

export const useAsync = <D> (initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig}

  /*
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  */

  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({
    ...state, ...action
  }), {
    ...defaultInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch)
  const setData = useCallback((data: D) => safeDispatch({
    data,
    error: null,
    stat: 'success'
  }), [safeDispatch])

  const setError = useCallback((error: Error) => safeDispatch({
    data: null,
    error,
    stat: 'error'
  }), [safeDispatch])

  const run = useCallback((promise: Promise<D>) => {
    if (!promise || !promise.then) throw new Error('需传入promise类型数据')

    safeDispatch({stat: 'loading'})
    return promise
      .then(data => {
        setData(data)
        // setData(data)
        return data
      })
      .catch(err => {
        setError(err)
        if (config.throwOnError) return Promise.reject(err)
        return err
      })
  }, [config.throwOnError, safeDispatch, setData, setError])

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
