import React, { useEffect, useState } from 'react'
import { PropsType as SearchPropsType, SearchPanel } from './search-panel'
import { List, PropsType as ListPropsType } from './list'
import { clearObj, useDebounce, useMount } from '../../utils'
import { useHttp } from '../../utils/http'

const baseURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState<SearchPropsType['param']>({name: '', personId: ''})
  const [list, setList] = useState<ListPropsType['list']>([])
  const [users, setUsers] = useState<ListPropsType['users']>([])
  const client = useHttp()

  const debounceParam = useDebounce(param)


  useEffect(() => {
    const getData = async () => {
      const res = await client('projects', {data: clearObj(debounceParam)})
      setList(res)
    }
    getData()
  }, [client, debounceParam])

  useMount(async () => {
    const res = await client('/users')
    setUsers(res)
  })

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}

