import React, { Component } from 'react'
import Students from '../0_Atoms/Students.jsx'

export default class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sourse = { sourse: 0 }
    const className = 'canvas pc_' + this.props.picture
    return (
      <div className="CAN">
        <Students students={this.props.students} />
        <div className={className} onClick={() => this.props.press(0)}></div>
      </div>
    )
  }
}
