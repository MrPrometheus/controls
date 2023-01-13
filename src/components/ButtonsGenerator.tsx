import { Button, Input } from 'antd'
import { CSSProperties, MouseEventHandler, useCallback, useState } from 'react'

interface ButtonItemType {
  name: string
  position: 'left' | 'right'
  callback: (e: any, controlValue: string) => string | void
}

interface ButtonsGeneratorProps {
  value?: string
  buttons: ButtonItemType[]
  style?: CSSProperties
}

export const ButtonsGenerator = (props: ButtonsGeneratorProps) => {
  const { value = '', buttons = [] } = props

  const [inputValue, setInputValue] = useState(value)

  const onChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const onButtonClick = useCallback(
    (e: MouseEventHandler<HTMLElement>, btn: ButtonItemType) => {
      const a = btn.callback(e, inputValue)
      if (typeof a !== 'undefined') setInputValue(a)
    },
    [inputValue]
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...props.style }}>
      {buttons
        .filter((item) => item.position === 'left')
        .map((item: ButtonItemType, index) => {
          return (
            <Button key={index} onClick={(e: any) => onButtonClick(e, item)}>
              {item.name}
            </Button>
          )
        })}
      <Input value={inputValue} onChange={onChange}></Input>
      {buttons
        .filter((item) => item.position === 'right')
        .map((item: ButtonItemType, index) => {
          return (
            <Button key={index} onClick={(e: any) => onButtonClick(e, item)}>
              {item.name}
            </Button>
          )
        })}
    </div>
  )
}
