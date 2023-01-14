import { CSSProperties, ChangeEvent } from 'react'
import { CountryInfo, getCountryByName } from '../api/apiService'
import { Dropdown, Image, Input } from 'antd'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

export class AutoCompliteSearchModel {
  public timerId: any
  public inputValue: string
  public countries: CountryInfo[]

  constructor(inputValue: string = '') {
    this.inputValue = inputValue
    this.countries = []
    makeAutoObservable(this)
  }

  onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    this.inputValue = event.target.value
    clearTimeout(this.timerId)
    this.timerId = setTimeout(async () => {
      this.countries = await getCountryByName(event.target.value)
    }, 400)
  }
}

interface AutoCompliteSearchProps {
  maxCountHint?: number
  searchModel: AutoCompliteSearchModel
  style?: CSSProperties
}

export const AutoCompliteSearch = observer((props: AutoCompliteSearchProps) => {
  const { style, maxCountHint = 5, searchModel } = props

  return (
    <Dropdown
      menu={{
        items: searchModel.countries
          .map((item, index) => ({
            key: `${item.name}-${index}`,
            label: <div style={{ marginLeft: '10px' }}>{`${item.name} (${item.fullName})`}</div>,
            icon: <Image width={32} src={item.flag} />,
            onClick: () => {
              searchModel.inputValue = `${item.name} (${item.fullName})`
            },
          }))
          .filter((item, index) => index < maxCountHint),
      }}
      trigger={['click']}
      open={searchModel.countries!.length === 0 ? false : undefined}
    >
      <Input style={{ ...style }} value={searchModel.inputValue} onChange={(e) => searchModel.onChangeInput(e)} />
    </Dropdown>
  )
})
