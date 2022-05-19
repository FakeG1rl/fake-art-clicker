import React, { Component } from 'react'
import Students from '../0_Atoms/Students.jsx'

export default class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sourse = { sourse: 0 }
    const quo =
      this.props.pictureQ == 1
        ? '0'
        : this.props.pictureQ > 0.7
        ? '1'
        : this.props.pictureQ > 0.3
        ? '2'
        : '3'
    const className = 'canvas pc_' + this.props.pictureId + ' quo_' + quo
    return (
      <div className="CAN">
        <Students students={this.props.students} />
        <div className={className} onClick={() => this.props.press(0)}></div>
      </div>
    )
  }
}
