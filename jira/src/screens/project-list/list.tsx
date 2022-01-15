import React from 'react'
import { Project, User } from "../../type";
import { Dropdown, Menu, Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useHandleHttpProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./utils";

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({users, ...props}: ListProps) => {
  const {handler: mutate} = useHandleHttpProject()

  const handlerPin = (id: number) => (pin: boolean) => mutate({id, pin}, 'PATCH')
  const {open} = useProjectModal()
  const tableColumns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render (value, project) {
        return <Pin checked={project.pin}
                    onCheckedChange={handlerPin(project.id)} />
      }
    },
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
    },
    {
      render () {
        return <Dropdown overlay={<Menu>
          <Menu.Item key='edit'>
            <ButtonNoPadding type='link'
                             onClick={open}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>}>
          <ButtonNoPadding type='link'>...</ButtonNoPadding>
        </Dropdown>
      }
    },
  ]

  return <Table pagination={false} columns={tableColumns} rowKey='id' {...props} />
}
