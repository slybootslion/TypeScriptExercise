import React from 'react'
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp = () => {
  const {logout, user} = useAuth()

  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgba(38, 132, 255)'} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={<Menu>
          <Menu.Item key={'logout'}>
            <Button type='link' onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>}>
          <Button type='link'>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen />
    </Main>
  </Container>
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
