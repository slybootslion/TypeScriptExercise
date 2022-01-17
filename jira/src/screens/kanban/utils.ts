import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";

export const useProjectIdInUrl = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})
export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  return useMemo(() => {
    return {
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }
  }, [param, projectId])
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
