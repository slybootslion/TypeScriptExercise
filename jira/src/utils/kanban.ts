import { Kanban } from "../type/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', {data: param}))
}
