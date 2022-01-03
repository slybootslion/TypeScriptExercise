import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import React from 'react'
import { Button, Card, Typography } from "antd";
import styled from "@emotion/styled";
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import logo from 'assets/logo.svg'

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [err, setErr] = useState<Error | null>(null)

  return <Container>
    <Header />
    <Background />
    <ShadowCard>
      <Title>{isLogin ? '请登录' : '请注册'}</Title>
      {err ? <Typography.Text type='danger'>{err.message}</Typography.Text> : null}
      {isLogin ? <LoginScreen onError={setErr} /> : <RegisterScreen onError={setErr} />}
      <Button onClick={() => setIsLogin(!isLogin)}>切换到{isLogin ? '注册' : '登录'}</Button>
    </ShadowCard>
  </Container>
}

// css
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
  calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
