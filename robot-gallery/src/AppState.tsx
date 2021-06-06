import React, { useState } from "react";

interface AppStateValue {
  username: string
  shoppingCart: { items: { id: number, name: string }[] }
}

const ctxValue: AppStateValue = {
  username: 'SlybootsLion',
  shoppingCart: {items: []}
}
export const appCtx = React.createContext(ctxValue)
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)

export const AppStateProvider: React.FC = props => {
  const [state, setState] = useState(ctxValue)
  return (
    <appCtx.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appCtx.Provider>
  )
}
