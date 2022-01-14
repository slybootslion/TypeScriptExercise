import React from 'react'
import { Button, Drawer } from "antd";

export const ProjectModal = () => {

  return <Drawer onClose={() => {}} width='100%'
                 visible={false}>
    <h1>project modal</h1>
    <Button onClick={() => {}}>关闭</Button>
  </Drawer>
}
