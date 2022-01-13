import React from 'react'
import { Select } from "antd";
import { Raw } from "../type";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string, id: number }[]
}

const toNumber = (val: unknown) => {
  return isNaN(Number(val)) ? 0 : Number(val)
}

export const IdSelect = (props: IdSelectProps) => {
  const {value, onChange, defaultOptionName, options, ...restProps} = props

  return <Select value={options?.length ? toNumber(value) : 0}
                 onChange={value => onChange(toNumber(value) || undefined)}
                 {...restProps}>
    {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
    {options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
  </Select>
}
