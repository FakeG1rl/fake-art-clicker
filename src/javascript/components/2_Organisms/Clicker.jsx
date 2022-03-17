import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { paint, sell, autoSell, galleryWorking } from '../../actions/index.js'

import Header from '../1_Molecules/Header.jsx'
import Canvas from '../1_Molecules/Canvas.jsx'

class Clicker extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setInterval(() => {
      const students = this.props.general.units[0]
      const dillers = this.props.general.units[1]
      if (students.level > 0) {
        this.props.actions.paint(1)
      }
      if (dillers.level > 0) {
        this.props.actions.autoSell()
      }
      this.pistureSell()
      this.props.actions.galleryWorking()
      console.log('___________')
    }, 1000)
  }

  pistureSell = () => {
    this.props.general.paintings[0].forEach((paint, i) => {
      if (paint.status == 10) {
        paint.time_to_sale -= 1
        if (paint.time_to_sale <= 0) {
          this.props.actions.sell(i)
        }
      }
    })
  }

  render() {
    return (
      <div className="Clicker">
        <h1>{this.props.general.clicksDone}</h1>
        <Header
          cash={this.props.general.moneyGained}
          clicks={this.props.general.clicksToPainting}
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
  actions: bindActionCreators(
    { paint, sell, autoSell, galleryWorking },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Clicker)
