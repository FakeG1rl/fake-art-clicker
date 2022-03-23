import React, { Component } from 'react'

export default class AltShopBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="AltShopBlock">
        <div className="title">
          <h3>{this.props.name}</h3>
          <h4>${this.props.cost}</h4>
        </div>
        <div className="line"></div>
        <div className="altContent">
          <p>{this.props.content}</p>
        </div>
      </div>
    )
  }
}
