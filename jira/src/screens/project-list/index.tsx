import React from "react";
import { useDebounce } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { Button, Divider, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUser } from "../../utils/user";
import { useProjectModal, useProjectSearchParams } from "./utils";
import { ErrorBox, Row } from "../../components/lib";

export const ProjectListScreen = () => {

  const [param, setParam] = useProjectSearchParams()
  const {isLoading: loading, error, data: list} = useProjects(useDebounce(param, 500))
  const {data: users} = useUser()
  const {open} = useProjectModal()
  return <Container>
    <Row between={true}>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <Button onClick={open}>创建项目</Button>
    </Row>
    <Divider />
    <ErrorBox error={error} />
    <List users={users || []} dataSource={list || []} loading={loading} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`
