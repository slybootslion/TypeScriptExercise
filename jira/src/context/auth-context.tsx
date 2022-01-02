import React, { ReactNode, useState } from "react";
import { AuthForm, getToken } from "../auth-provider";
import { login as apLogin, register as apRegister, logout as apLogout } from 'auth-provider'
import { User } from "../type";
import { http } from "../utils/http";
import { useMount } from "../utils";

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
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => apLogin(form).then(setUser)
  const register = (form: AuthForm) => apRegister(form).then(setUser)
  const logout = () => apLogout().then(() => setUser(null))

  useMount(() => bootstrapUser().then(setUser))

  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
