import React, { ReactNode, useState } from 'react'
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from '../auth-provider'
import { User } from '../screens/project-list/search-panel'

interface AuthForm {
  username: string,
  password: string
}

interface AuthContextType {
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
  user: User | null
}

const AuthContext = React.createContext<undefined | AuthContextType>(undefined)


export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const login = async (form: AuthForm) => authLogin(form).then(setUser)
  const register = async (form: AuthForm) => authRegister(form).then(setUser)
  const logout = () => authLogout().then(() => setUser(null))

  return <AuthContext.Provider children={children} value={{login, register, logout, user}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
