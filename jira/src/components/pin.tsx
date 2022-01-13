import React from "react";
import { Rate } from "antd";

export interface PinProp extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Pin = (props: PinProp) => {
  const {checked, onCheckedChange, ...restProps} = props
  return <Rate count={1}
               value={checked ? 1 : 0}
               onChange={num => onCheckedChange?.(!!num)}
               {...restProps} />
}

