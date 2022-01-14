import { User } from "../type";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";

export const useUser = (param?: Partial<User>) => {
  const client = useHttp()
  const {run, ...result} = useAsync<User[]>()
  useEffect(() => {
    run(client('users', {data: cleanObject(param)}))
  }, [client, param, run])
  return result
}
