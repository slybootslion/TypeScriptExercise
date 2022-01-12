import React, { useState } from "react";
import { useDebounce } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/project";
import { useUser } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";

export const ProjectListScreen = () => {

  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param, 500)

  const {isLoading: loading, error, data: list} = useProject(debouncedParam)
  const {data: users} = useUser()

  return <Container>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
    <List users={users || []} dataSource={list || []} loading={loading} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`
