import React, { useEffect } from 'react'
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal } from "../screens/project-list/utils";
import { UserSelect } from "./user-select";
import { useHandleHttpProject } from "../utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "./lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
  let title = '创建项目', method = 'POST'
  if (editingProject) {
    title = '编辑项目'
    method = 'PATCH'
  }
  const {mutateAsync, error, isLoading: mutateLoading} = useHandleHttpProject(method)
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return <Drawer onClose={close}
                 width='100%'
                 forceRender={true}
                 visible={projectModalOpen}>
    <Container>
      {
        isLoading ? <Spin size='large' /> : <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form layout='vertical'
                form={form}
                style={{width: '40rem'}}
                onFinish={onFinish}>
            <Form.Item label='名称' name='name' rules={[{required: true, message: '请输入名称'}]}>
              <Input placeholder={'请输入项目名称'} />
            </Form.Item>
            <Form.Item label='部门' name='organization' rules={[{required: true, message: '请输入部门'}]}>
              <Input placeholder={'请输入部门名称'} />
            </Form.Item>
            <Form.Item label='负责人' name='personId'>
              <UserSelect defaultOptionName='负责人' />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
          </Form>
        </>
      }
      <Button onClick={close}>关闭</Button>
    </Container>
  </Drawer>
}


const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
