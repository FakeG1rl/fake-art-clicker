import React from 'react'
import ReactDOM from 'react-dom'
import Game from './containers/game.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game />,
    document.body.appendChild(document.createElement('div'))
  )
})
