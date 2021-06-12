import React, { ChangeEvent, EventHandler, ReactEventHandler, useEffect, useState } from 'react'

interface ParamTypes {
  name: string
  personId: string
}

export const SearchPanel: React.FC = props => {
  const [param, setParam] = useState<ParamTypes>({name: '', personId: ''})
  const [users, setUsers] = useState<any[]>([])
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await (await fetch('/')).json()
      setList(res.data)
    }
    getData()
  }, [param])

  const inputChange = (e: any) => setParam({...param, name: e.target.value})

  const selectChange = (e: any) => setParam({...param, personId: e.target.value})

  return (
    <>
      <input type="text" value={param.name} onChange={inputChange} />
      <select value={param.personId} onChange={selectChange}>
        <option value="">负责人</option>
        {users.map(user => <option value={user.id}>{user.name}</option>)}
      </select>
    </>
  )
}
