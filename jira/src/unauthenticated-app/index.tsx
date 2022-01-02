import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import React from 'react'
import { Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true)

  return <div style={{display: 'flex', justifyContent: 'center'}}>
    <Card>
      {isLogin ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsLogin(!isLogin)}>切换到{isLogin ? '注册' : '登录'}</button>
    </Card>
  </div>
}
