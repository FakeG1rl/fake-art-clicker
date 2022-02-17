import React, { Component } from 'react'
import Students from '../0_Atoms/Students.jsx'

export default class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="CAN">
        <Students students={this.props.students} />
        <div className="canvas" onClick={this.props.press}></div>
      </div>
    )
  }
}
