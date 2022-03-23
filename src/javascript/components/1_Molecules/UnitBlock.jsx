import React, { Component } from 'react'
import AltShopBlock from './AltShopBlock.jsx'

export default class UnitBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    return (
      <div className="UnitBlock" onClick={() => props.onPress(props.id)}>
        <div className="im"></div>
        <div className="content">
          <p>
            <span>{props.unit.level}</span> в мастерской
          </p>
          <h3>Нанять {props.title}а</h3>
          <p>${props.unit.cost}</p>
        </div>

        <AltShopBlock
          name={props.title.charAt(0).toUpperCase() + props.title.slice(1)}
          cost={props.unit.cost}
          content={props.unit.text}
        />
      </div>
    )
  }
}
