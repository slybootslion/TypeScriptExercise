import { useQuery } from "react-query";
import { useHttp } from "./http";
import { TaskType } from "../type/task-type";

export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<TaskType[]>(['tasks'], () => client('taskTypes'))
}
