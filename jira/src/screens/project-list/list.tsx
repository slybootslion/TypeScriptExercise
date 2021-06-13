import React from 'react'
import { User } from './search-panel'

interface Project {
  id: string,
  name: string,
  personId: string,
  organization: string,
  pin: boolean
}

export interface PropsType {
  list: Project[],
  users: User[]
}

export const List:React.FC<PropsType> = props => {
  const { list, users } = props
  return (
    <table>
      <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      </thead>
      <tbody>
      {
        list.map(project => <tr key={project.id}>
          <td>{project.name}</td>
          <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
        </tr>)
      }
      </tbody>
    </table>
  )
}

