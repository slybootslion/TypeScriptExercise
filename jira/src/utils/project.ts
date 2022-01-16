import { Project } from "../type";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () => client('projects', {data: cleanObject(param)}))
}

export const useHandleHttpProject = (method: string, queryKey: QueryKey) => {
  const client = useHttp()
  let useConfigType = useAddConfig
  if (method === 'PATCH') {
    useConfigType = useEditConfig
  }
  if (method === 'DELETE') {
    useConfigType = useDeleteConfig
  }
  return useMutation(
    (params: Partial<Project>) => {
      const url = method === 'POST' ? `projects` : `projects/${params.id}`
      return client(url, {method, data: params})
    },
    useConfigType(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
