import React from 'react'
import { Project, User } from "../../type";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({list, users}: ListProps) => {

  const tableColumns: ColumnsType<Project> = [
    {title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
    {
      title: '负责人', render (value, project) {
        return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
      }
    }
  ]

  return <Table pagination={false} dataSource={list} columns={tableColumns} />
}
