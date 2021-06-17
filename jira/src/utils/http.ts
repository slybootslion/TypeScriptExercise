import { useAuth } from 'context/auth-context'
import { stringify } from 'qs'
import { logout } from '../auth-provider'

const baseURL = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string,
  data?: object
}

export const http = (url: string, {data, token, headers, ...opts}: Config = {}) => {

  const config = {
    method: 'GET',
    header: {
      Authorization: token ? `bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...opts,
  }

  if (config.method.toUpperCase() === 'GET' && data) {
    url += `?${stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return fetch(`${baseURL}${url}`, config).then(async res => {
    /*if (res.status === 401) {
      await logout()
      window.location.reload()
      return Promise.reject({message: '身份异常，重新登录'})
    }*/
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const {user} = useAuth()
  return (...[url, config]: Parameters<typeof http>) => http(url, {...config, token: user?.token})
}
