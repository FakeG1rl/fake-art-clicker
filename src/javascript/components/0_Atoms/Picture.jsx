import React, { Component } from 'react'

import { paint } from '../../actions/index.js'

export default class Picture extends Component {
  constructor(props) {
    super(props)
  }

  renderBut = () => {
    const data = this.props.data

    let butItems = []
    let action = this.props.changeblock
    let text1 = ''
    let text2 = ''

    if (data.status == 0) {
      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 2)}
        >
          В галерею
        </div>
      )
      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 1)}
        >
          В образцы
        </div>
      )
    } else if (data.status == 1) {
      butItems = []

      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 2)}
        >
          В галерею
        </div>
      )
      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 0)}
        >
          На продажу
        </div>
      )
    } else if (data.status == 2) {
      butItems = []

      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 1)}
        >
          В образцы
        </div>
      )
      butItems.push(
        <div
          className="but"
          onClick={() => action(this.props.id, data.status, 0)}
        >
          На продажу
        </div>
      )
    }
    return butItems
  }

  render() {
    const picture = this.props.data
    const className = 'Picture style_' + picture.referense.style
    let action = null

    if (picture.status == 0) {
      action = () => this.props.onPress(this.props.id)
    }

    return (
      <div className="Picture_wrap">
        <div className={className} onClick={action}>
          <p>style: {picture.referense.style}</p>
          <p>qua: {picture.quality}</p>
          <p>st: {picture.status}</p>
        </div>
        {this.renderBut()}
      </div>
    )
  }
}
