import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import React from 'react'

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true)

  const change = () => setIsLogin(!isLogin)

  return <div>
    {isLogin ? <LoginScreen /> : <RegisterScreen />}
    <button onClick={change}>切换到{isLogin ? '注册' : '登录'}</button>
  </div>
}
