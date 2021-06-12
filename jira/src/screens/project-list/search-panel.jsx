import React from 'react'

export const SearchPanel = props => {
  const {param, setParam, users} = props

  const inputChange = e => setParam({...param, name: e.target.value})

  const selectChange = e => setParam({...param, personId: e.target.value})

  return (
    <>
      <input type="text" value={param.name} onChange={inputChange} />
      <select value={param.personId} onChange={selectChange}>
        <option value="">负责人</option>
        {users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select>
    </>
  )
}
