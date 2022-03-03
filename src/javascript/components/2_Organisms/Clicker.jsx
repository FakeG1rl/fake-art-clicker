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
      students: { count: 0 }
    }
  }

  render() {
    const students = this.props.general.units[0]
    setInterval(() => {
      if (students.level > 0) {
        this.props.actions.paint()
      }
    }, 10000)

    return (
      <div className="Clicker">
        <h1>{this.props.general.clicksDone}</h1>
        <Header
          cash={this.props.general.moneyGained}
          dillers={this.props.general.units[1]}
        />
        <Canvas
          students={this.props.general.units[0].level}
          press={this.props.actions.paint}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ paint }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Clicker)
