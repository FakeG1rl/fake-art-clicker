import React, { Component } from 'react'
import Test from '../components/Test.jsx'

export default class Game extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Test />
      </div>
    )
  }
}
