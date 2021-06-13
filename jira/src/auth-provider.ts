import { User } from './screens/project-list/search-panel'
import { loadDevTools } from "jira-dev-tool";

const localStorageKey = '__auth_provider_token__'
const baseURL = process.env.REACT_APP_API_URL

export const getToken = localStorage.getItem(localStorageKey)

export const setToken = (token: string) => localStorage.setItem(localStorageKey, token)

export const handleUserResponse = ({user}: { user: User }) => {
  setToken(user.token || '')
  return user
}

export const login = async (params: { username: string, password: string }) => {
  const user = await (await fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params),
  })).json()
  return handleUserResponse(user)
}

export const register = async (params: { username: string, password: string }) => {
  console.log(params)
  const user = await (await fetch(`${baseURL}/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params),
  })).json()
  return handleUserResponse(user)
}

export const logout = async () => localStorage.removeItem(localStorageKey)
