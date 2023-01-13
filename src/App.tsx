import './App.css'
import { ButtonsGenerator } from './components/ButtonsGenerator'
import React from 'react'

export const App = () => {
  return (
    <div>
      <ButtonsGenerator
        style={{ marginBottom: '20px' }}
        buttons={[
          { name: 'Clear', callback: () => '', position: 'right' },
          { name: 'Set "Hellow world!"', callback: () => 'Hello world!', position: 'right' },
        ]}
      />

      <ButtonsGenerator
        buttons={[
          { name: 'alert', callback: (e, value) => alert(value), position: 'right' },
          {
            name: 'it`s a number?',
            callback: (e, value) => {
              if (!Number.isNaN(+value)) alert(value)
            },
            position: 'left',
          },
        ]}
      />
    </div>
  )
}

export default App
