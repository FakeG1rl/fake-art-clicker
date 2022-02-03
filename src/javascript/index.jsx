import '../bundle.scss'

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Game from './containers/Game.jsx'

const store = createStore(reducer)

console.log('STORE', store)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
