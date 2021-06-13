import React from 'react'

export interface User {
  id: string;
  name: string;
  email?: string;
  title?: string;
  organization?: string,
  token: string,
}

export interface PropsType {
  param: {name: string, personId: string};
  setParam: (param: PropsType['param']) =>void;
  users: User[]
}

export const SearchPanel:React.FC<PropsType> = props => {
  const {param, setParam, users} = props

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => setParam({...param, name: e.target.value})

  const selectChange = (e:React.ChangeEvent<HTMLSelectElement>) => setParam({...param, personId: e.target.value})

  return (
    <form>
      <input type="text" value={param.name} onChange={inputChange} />
      <select value={param.personId} onChange={selectChange}>
        <option value="">负责人</option>
        {users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select>
    </form>
  )
}
