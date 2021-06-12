import React, { useEffect, useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { stringify } from 'qs'
import { clearObj, useDebounce, useMount } from '../../utils'

const baseURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({name: '', personId: ''})
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debounceParam = useDebounce(param)

  useEffect(() => {
    const getData = async () => {
      const res = await (await fetch(`${baseURL}/projects?${stringify(clearObj(debounceParam))}`)).json()
      setList(res)
    }
    getData()
  }, [debounceParam])

  useMount(async () => {
    const res = await (await fetch(`${baseURL}/users`)).json()
    setUsers(res)
  })

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}

