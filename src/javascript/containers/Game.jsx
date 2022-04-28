import React from 'react'
import { connect } from 'react-redux'
// import * as GameActions from '../actions'
import { bindActionCreators } from 'redux'
import Clicker from '../components/2_Organisms/Clicker.jsx'
import Body from '../components/2_Organisms/Body.jsx'

import {
  paint,
  sell,
  chandePage,
  autoSell,
  galleryWorking,
  chandePhase,
  getPhrase,
  save,
  load
} from '../actions/index.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.general.loading) {
        this.props.actions.load()
      } else {
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
        this.props.actions.chandePhase()
        this.props.actions.getPhrase()
        this.props.actions.save()

        console.log('___________')
      }
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
    if (!this.props.general.loading) {
      return (
        <div className="Game">
          <Clicker />
          <Body
            page={this.props.general.pageid}
            phase={this.props.general.phase}
            phrase={this.props.general.phrase}
            changePage={this.props.actions.chandePage}
          />
        </div>
      )
    } else {
      return (
        <div className="Game">
          <p>LOADING</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      paint,
      sell,
      chandePage,
      autoSell,
      galleryWorking,
      chandePhase,
      getPhrase,
      save,
      load
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
