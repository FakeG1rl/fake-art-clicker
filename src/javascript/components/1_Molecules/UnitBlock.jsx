import React, { Component } from 'react'

export default class UnitBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    return (
      <div className="UnitBlock" onClick={() => props.onPress(props.id)}>
        <p>{props.level} в мастерской</p>
        <p>Нанять{props.title}а</p>
        <p>${props.cost}</p>
      </div>
    )
  }
}
