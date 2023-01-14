import { Button, Input, Space } from 'antd'
import { ChangeEvent, MouseEventHandler } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

interface ButtonItemType {
  name: string
  position: 'left' | 'right'
  callback: (e: any, controlValue: string) => string | void
}

interface ButtonsGeneratorProps {
  generator: ButtonGeneratorModel
}

export class ButtonGeneratorModel {
  public value: string = ''
  public buttons: ButtonItemType[] = []

  constructor(buttons: ButtonItemType[] = [], value: string = '') {
    this.buttons = buttons
    this.value = value
    makeAutoObservable(this)
  }

  onChangeValue(event: ChangeEvent<HTMLInputElement>) {
    this.value = event.target.value
  }

  onButtonClick(e: MouseEventHandler<HTMLElement>, btn: ButtonItemType) {
    const a = btn.callback(e, this.value)
    if (typeof a !== 'undefined') this.value = a
  }
}

export const ButtonsGenerator = observer((props: ButtonsGeneratorProps) => {
  const { generator } = props
  return (
    <Space style={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>
      {generator.buttons
        .filter((item) => item.position === 'left')
        .map((item: ButtonItemType, index) => {
          return (
            <Button type="primary" key={`left ${index}`} onClick={(e: any) => generator.onButtonClick(e, item)}>
              {item.name}
            </Button>
          )
        })}
      <Input value={generator.value} onChange={(e) => generator.onChangeValue(e)}></Input>
      {generator.buttons
        .filter((item) => item.position === 'right')
        .map((item: ButtonItemType, index) => {
          return (
            <Button type="primary" key={`right ${index}`} onClick={(e: any) => generator.onButtonClick(e, item)}>
              {item.name}
            </Button>
          )
        })}
    </Space>
  )
})
