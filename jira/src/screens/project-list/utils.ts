import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams()
  return ['projects', params]
}

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const {data: editingProject, isLoading} = useProject(+editingProjectId)

  const open = () => setProjectCreate({projectCreate: true})
  const setUrlSearchParam = useSetUrlSearchParam()
  const close = () => setUrlSearchParam({projectCreate: undefined, editingProjectId: undefined})

  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
