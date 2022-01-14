import React, { ReactNode, useCallback } from "react";
import { AuthForm, getToken } from "../auth-provider";
import { User } from "../type";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../components/lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from '../store/auth.slice'
import { bootstrap, selectUser } from '../store/auth.slice'

export type ChildrenNodeType = {
  children: ReactNode
}

export const bootstrapUser = async () => {
  let user = null

  const token = getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }

  return user
}

export const AuthProvider = ({children}: ChildrenNodeType) => {
  const {error, isLoading, isIdle, isError, run} = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  useMount(() => run(dispatch(bootstrap())))

  if (isLoading || isIdle) return <FullPageLoading />

  if (isError) return <FullPageError err={error} />

  return <>{children}</>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {user, login, register, logout}
}
