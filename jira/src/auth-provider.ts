import { User } from "./type";

const apiURL = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export type AuthForm = {
  username: string
  password: string
}

export const login = (data: AuthForm) => {
  return fetch(`${apiURL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async response => {
    return response.ok ? handleUserResponse(await response.json()) : Promise.reject(await response.json())
  })
}

export const register = (data: AuthForm) => {
  return fetch(`${apiURL}/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async response => {
    return response.ok ? handleUserResponse(await response.json()) : Promise.reject(await response.json())
  })
}

export const logout = async () => localStorage.removeItem(localStorageKey)
