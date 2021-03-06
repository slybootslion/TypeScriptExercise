import { Kanban } from "../../type/kanban";
import React from 'react'
import { useTasks } from "../../utils/task";
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from "./utils";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from '../../assets/task.svg'
import bugIcon from '../../assets/bug.svg'
import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useDeleteKanban } from "../../utils/kanban";
import { CreateTask } from "./create-task";
import { Task } from "../../type/task";
import { Mark } from "../../components/mark";

export const KanbanColumn = ({kanban}: { kanban: Kanban }) => {
  const {data: allTasks} = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id) || []
  return <Container>
    <Row between={true}>
      <h3>{kanban.name}</h3>
      <More kanban={kanban} />
    </Row>
    <TasksContainer>
      {tasks?.map(task => <TaskCard task={task} key={task.name} />)}
      <CreateTask kanbanId={kanban.id} />
    </TasksContainer>
  </Container>
}

const TaskCard = ({task}: { task: Task }) => {
  const {startEdit} = useTasksModal()
  const {name: keyword} = useTasksSearchParams()
  return <Card onClick={() => startEdit(task.id)}
               style={{marginBottom: '0.5rem', cursor: 'pointer'}}>
    {/*<div>{task.name}</div>*/}
    <Mark name={task.name} keyword={keyword} />
    <TaskTypeIcon id={task.typeId} />
  </Card>
}

const More = ({kanban}: { kanban: Kanban }) => {
  const {mutateAsync} = useDeleteKanban(useKanbanQueryKey())
  const confirmOpts = {
    okText: '确定',
    cancelText: '取消',
    title: '确定删除看板吗',
    async onOk () {
      await mutateAsync({id: kanban.id})
    }
  }

  const startDelete = () => {
    Modal.confirm(confirmOpts)
  }

  const overlay = <Menu>
    <Menu.Item key=''>
      <Button type={'link'} onClick={startDelete}>删除</Button>
    </Menu.Item>
  </Menu>

  return <Dropdown overlay={overlay}><Button type='link'>...</Button></Dropdown>
}


const TaskTypeIcon = ({id}: { id: number }) => {
  const {data: taskTypes} = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) return null
  return <img src={name === 'task' ? taskIcon : bugIcon} alt='' />
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
