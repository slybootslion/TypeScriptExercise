import React from 'react'
import { useAuth } from '../../context/auth-context'

const baseURL = process.env.REACT_APP_API_URL

export const Login: React.FC = () => {

  const {login, user} = useAuth()

  /*async function login (params: { username: string, password: string }) {
    const res = await (await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    })).json()
    console.log(res)
  }*/

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*const form: { username: string, password: string } = {username: '', password: ''}
    Array.from(e.currentTarget.elements).forEach(ele => {
      if (ele instanceof HTMLInputElement) {
        if (ele.id === 'username') form.username = ele.value
        if (ele.id === 'password') form.password = ele.value
      }
    })*/
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    login({username, password})
    // register({username, password})
  }

  return <form onSubmit={handleSubmit}>
    {
      user ? <div>登录成功，用户名：{user?.name}</div> : <>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id='username' />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id='password' />
        </div>
        <button type='submit'>登录</button>
      </>
    }
  </form>
}
