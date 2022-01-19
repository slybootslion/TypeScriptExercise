import React, { useEffect } from 'react'
import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./utils";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

export const TaskModal = () => {
  const [form] = useForm()
  const {editingTaskId, editingTask, close} = useTasksModal()

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey())
  const onOk = async () => {
    await editTask({...editingTask, ...form.getFieldsValue()})
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗？',
      onOk () {
        deleteTask({id: +editingTaskId})
      }
    })
  }

  const {mutate: deleteTask} = useDeleteTask(useTasksQueryKey())

  return <Modal okText='确认'
                cancelText='取消'
                forceRender={true}
                visible={!!editingTaskId}
                title='编辑任务'
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={editLoading}>
    <Form form={form} initialValues={editingTask} {...layout}>
      <Form.Item label='任务名'
                 name='name'
                 rules={[{required: true, message: '请输入任务名'}]}>
        <Input />
      </Form.Item>
      <Form.Item label='经办人' name='processorId'>
        <UserSelect defaultOptionName='经办人' />
      </Form.Item>
      <Form.Item label='类型' name='typeId'>
        <TaskTypeSelect />
      </Form.Item>
    </Form>
    <div style={{textAlign: 'right'}}>
      <Button size='small'
              onClick={startDelete}
              style={{fontSize: "14px"}}>删除</Button>
    </div>
  </Modal>
}
