import React, {Component} from "react"
import Header from '../1_Molecules/Header.jsx'
import Canvas from '../1_Molecules/Canvas.jsx'

export default class Clicker extends Component {
  constructor(props) {
    super(props)
    this.state= {
      dillers: {'count': 10},
      cash: 0,
      students: {'count': 10}
    }
  }

  render() {
    console.log(this.props);
    return(
      <div className="Clicker">
        <Header cash={this.state.cash} dillers={this.state.dillers}/>
        <Canvas students={this.state.students.count}/>
      </div>
    )
  }
}
