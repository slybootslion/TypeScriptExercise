import React from 'react'
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectPopover } from "./components/project-popover";
import { ProjectModal } from "./components/project-modal";

export const AuthenticatedApp = () => {

  return <Container>
    <PageHeader />
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />} />
          <Route path='/projects/:projectId/*' element={<ProjectScreen />} />
          <Route path='/' element={<Navigate to='/projects' />} />
        </Routes>
      </BrowserRouter>
    </Main>
    <ProjectModal/>
  </Container>
}

const PageHeader = () => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type='link' onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgba(38, 132, 255)'} />
      </ButtonNoPadding>
      <ProjectPopover />
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const {logout, user} = useAuth()

  return <Dropdown overlay={<Menu>
    <Menu.Item key={'logout'}>
      <Button type='link' onClick={logout}>登出</Button>
    </Menu.Item>
  </Menu>}>
    <Button type='link'>Hi, {user?.name}</Button>
  </Dropdown>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled(Row)`
  height: 6rem;
  padding: 0 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  z-index: 1;
`

const HeaderRight = styled.div``

const HeaderLeft = styled(Row)``

const Main = styled.main`
  grid-area: main;
`
