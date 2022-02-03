import React, {Component} from "react"
import Student from '../0_Atoms/Student.jsx'

export default class Students extends Component {
  constructor(props) {
    super(props)
  }

  renderStudents = () => {
    const students = this.props.students
    let studentsItems = []
    for ( var i=0; i < students; i++ ) {
      studentsItems.push(<Student number={i} key={i}/>)
    }
    return studentsItems
  }

  render() {
    return (
      <div className='Students'>
        {this.renderStudents()}
      </div>
    )
  }
}
