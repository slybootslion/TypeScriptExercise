import React, { useState } from 'react'
import { Register } from './register'
import { Login } from './login'

export const UnauthenticatedApp: React.FC = () => {

  const [isRegister, setIsRegister] = useState(false)

  const toggleIsRegister = () => setIsRegister(!isRegister)

  return <>
    isRegister ? <Register /> : <Login />
    <button onClick={toggleIsRegister}>切换到{isRegister ? '登录' : '注册'}</button>
  </>
}
