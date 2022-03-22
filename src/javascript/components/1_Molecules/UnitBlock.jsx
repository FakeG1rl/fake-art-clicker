import React, { Component } from 'react'

export default class UnitBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    return (
      <div className="UnitBlock" onClick={() => props.onPress(props.id)}>
        <p>
          <span>{props.level}</span> в мастерской
        </p>
        <h3>Нанять {props.title}а</h3>
        <p>${props.cost}</p>
      </div>
    )
  }
}
