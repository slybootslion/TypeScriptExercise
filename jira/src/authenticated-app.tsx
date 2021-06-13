import React from 'react'
import { ProjectListScreen } from './screens/project-list'
import { useAuth } from './context/auth-context'

export const AuthenticatedApp: React.FC = () => {
  const {logout} = useAuth()
  return <>
    <button onClick={logout}>登出</button>
    <ProjectListScreen />
  </>
}
