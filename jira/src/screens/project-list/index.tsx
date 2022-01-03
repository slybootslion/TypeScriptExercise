import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 500)

  const [list, setList] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return <Container>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`
