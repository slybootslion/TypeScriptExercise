import { SearchPanel, User } from './search-panel'
import { List, Project } from './list'
import { useEffect, useState } from 'react'
import { stringify } from 'qs'
import { cleanObject, useDebounce, useMount } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState<User[]>([])
  const [list, setList] = useState<Project[]>([])

  const debouncedParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${stringify(cleanObject(debouncedParam))}`).then(async res => {
      if (res.ok) setList(await res.json())
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) setUsers(await res.json())
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  )
}
