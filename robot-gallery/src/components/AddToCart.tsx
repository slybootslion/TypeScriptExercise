import React, { useContext } from "react";
import { appSetStateContext } from "../AppState";
import { RobotProps } from "./Robot";

export const withAddToCart = (ChildComp: React.ComponentType<RobotProps>) => {
  return props => {
    const setState = useContext(appSetStateContext)

    const add = (id, name) => {
      if (setState) {
        setState(state => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, {id, name}]
            }
          }
        })
      }
    }
    return <ChildComp {...props} add={add} />
  }
}

export const useAddToCart = () => {
  const setState = useContext(appSetStateContext)
  return (id, name) => {
    if (setState) {
      setState(state => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, {id, name}]
          }
        }
      })
    }
  }
}
