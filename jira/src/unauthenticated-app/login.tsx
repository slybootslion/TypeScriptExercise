import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";

export const LoginScreen = () => {

  const {login, user} = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const username = (e.currentTarget.elements[0] as HTMLFormElement).value
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value

    await login({username, password})
  }

  return <form onSubmit={handleSubmit}>
    {user ? `用户名：${user?.name}，token：${user?.token}` : null}
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={"submit"}>登录</button>
  </form>
}
