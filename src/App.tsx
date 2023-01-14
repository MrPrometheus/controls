import './App.css'
import { AutoCompliteSearch, AutoCompliteSearchModel } from './components/AutoCompliteSearch'
import { ButtonGeneratorModel, ButtonsGenerator } from './components/ButtonsGenerator'
import React from 'react'

export const App = () => {
  const generator1 = new ButtonGeneratorModel([
    { name: 'Clear', callback: () => '', position: 'right' },
    { name: 'Set "Hellow world!"', callback: () => 'Hello world!', position: 'right' },
  ])

  const generator2 = new ButtonGeneratorModel([
    { name: 'alert', callback: (e, value) => alert(value), position: 'right' },
    {
      name: 'it`s a number?',
      callback: (e, value) => {
        if (!Number.isNaN(+value)) alert(value)
      },
      position: 'left',
    },
  ])

  const searcher1 = new AutoCompliteSearchModel()
  const searcher2 = new AutoCompliteSearchModel()

  return (
    <div>
      <ButtonsGenerator generator={generator1} />

      <ButtonsGenerator generator={generator2} />

      <AutoCompliteSearch style={{ marginBottom: '50px' }} searchModel={searcher1} maxCountHint={3} />
      <AutoCompliteSearch searchModel={searcher2} maxCountHint={10} />
    </div>
  )
}

export default App
