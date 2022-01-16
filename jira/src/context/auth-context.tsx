import React, { ReactNode } from "react";
import { AuthForm, getToken } from "../auth-provider";
import { login as apLogin, logout as apLogout, register as apRegister } from 'auth-provider'
import { User } from "../type";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../components/lib";
import { useQueryClient } from "react-query";

export type ChildrenNodeType = {
  children: ReactNode
}

const bootstrapUser = async () => {
  let user = null

  const token = getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }

  return user
}

const AuthContext = React.createContext <{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)


export const AuthProvider = ({children}: ChildrenNodeType) => {
  const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()


  const login = (form: AuthForm) => apLogin(form).then(setUser)
  const register = (form: AuthForm) => apRegister(form).then(setUser)

  const queryClient = useQueryClient()
  const logout = () => apLogout().then(() => {
    setUser(null)
    queryClient.clear()
  })

  useMount(() => run(bootstrapUser()))

  if (isLoading || isIdle) return <FullPageLoading />

  if (isError) return <FullPageError err={error} />

  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
