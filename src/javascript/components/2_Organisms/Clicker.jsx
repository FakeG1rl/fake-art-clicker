import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { paint } from '../../actions/index.js'

import Header from '../1_Molecules/Header.jsx'
import Canvas from '../1_Molecules/Canvas.jsx'

class Clicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dillers: { count: 10 },
      cash: 0,
      students: { count: 0 }
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="Clicker">
        <Header cash={this.state.cash} dillers={this.state.dillers} />
        <h1>
          {this.props.general.clicksDone}, {this.props.general.paintingsDone}
        </h1>
        <Canvas
          students={this.state.students.count}
          press={this.props.actions.paint}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general[0]
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ paint }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Clicker)
