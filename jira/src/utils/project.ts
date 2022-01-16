import { Project } from "../type";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () => client('projects', {data: cleanObject(param)}))
}

export const useHandleHttpProject = (method: string) => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => {
      const url = method === 'PATCH' ? `projects/${params.id}` : `projects`
      return client(url, {method, data: params})
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
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
