import React from "react";
import { Project, User } from "../../type";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

  return <Form layout='inline' style={{marginBottom: '2rem'}}>
    <Form.Item>
      <Input placeholder='项目名' type="text" onChange={e => setParam({
        ...param,
        name: e.target.value
      })} />
    </Form.Item>
    <Form.Item>
      <UserSelect defaultOptionName='负责人'
                  value={param.personId}
                  onChange={value => setParam({
                    ...param,
                    personId: value
                  })} />
    </Form.Item>
  </Form>
}
