import React, { useEffect, useState } from "react";
import { User } from "../../type";

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

  return <form>
    <div>
      <input type="text" onChange={e => setParam({
        ...param,
        name: e.target.value
      })} />
    </div>
    <div>
      <select value={param.personId} onChange={e => setParam({
        ...param,
        personId: e.target.value
      })}>
        <option value="">负责人</option>
        {
          users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}
