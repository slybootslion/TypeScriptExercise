import React from 'react'
import { Project, User } from "../../type";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({users, ...props}: ListProps) => {

  const tableColumns: ColumnsType<Project> = [
    {
      title: '名称',
      render (value, project) {
        return <Link to={project.id + ''}>{project.name}</Link>
      },
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {title: '部门', dataIndex: 'organization'},
    {
      title: '负责人', render (value, project) {
        return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
      }
    },
    {
      title: '创建时间', render (value, project) {
        return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD HH:mm:ss') : '无'}</span>
      }
    }
  ]

  return <Table pagination={false} columns={tableColumns} rowKey='id' {...props} />
}
