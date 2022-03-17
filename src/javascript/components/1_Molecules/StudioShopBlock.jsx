import React, { Component } from 'react'
import Picture from '../0_Atoms/Picture.jsx'

export default class StudioShopBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    return (
      <div className="StudioShopBlock" onClick={() => props.onPress(props.id)}>
        <div className="title">
          <p>{props.title} </p>
          <p> ур {props.level}</p>
        </div>
        <p>Улучшить</p>
        <p>${props.cost}</p>
      </div>
    )
  }
}
