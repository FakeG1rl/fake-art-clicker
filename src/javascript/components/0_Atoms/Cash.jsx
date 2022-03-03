import React, { Component } from 'react'

export default class Cash extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Cash">
        <h2>${this.props.cash}</h2>
        <p>картин в секунду 0</p>
      </div>
    )
  }
}
