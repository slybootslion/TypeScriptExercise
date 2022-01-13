import { useAsync } from "./use-async";
import { Project } from "../type";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProject = (param?: Partial<Project>) => {
  const {run, ...result} = useAsync<Project[]>()
  const client = useHttp()
  useEffect(() => {
    run(client('projects', {data: cleanObject(param)}))
  }, [client, param, run])
  return result
}

export const useHandleHttpProject = () => {
  const {run, ...result} = useAsync()
  const client = useHttp()
  const handler = (params: Partial<Project>, method: string) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method
    }))
  }

  return {handler, ...result}
}
