import React from "react";
import { User } from "../../type";
import { Form, Select } from "antd";

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

  return <Form>
    <Form.Item>
      <input type="text" onChange={e => setParam({
        ...param,
        name: e.target.value
      })} />
    </Form.Item>
    <Form.Item>
      <Select value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })}>
        <Select.Option value="">负责人</Select.Option>
        {
          users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
        }
      </Select>
    </Form.Item>
  </Form>
}
