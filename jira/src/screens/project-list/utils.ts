import { useUrlQueryParam } from "../../utils/url";
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
  const close = () => {
    setProjectCreate({projectCreate: undefined})
    setEditingProjectId({editingProjectId: undefined})
  }

  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
