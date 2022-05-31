import './game.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Game from './javascript/containers/Game.jsx'
import configureStore from './javascript/store/configureStore.js'

// prettier-ignore
const clientId = document.cookie.match(/_ga=(.+?);/)[1].split('.').slice(-2).join('.')
const store = configureStore({ clientId: clientId })

console.log('STORE', store)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
