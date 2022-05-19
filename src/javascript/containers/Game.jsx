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

// ограничит перетаскивание в галерею пока та не открыта V
// ограничить вместительность галереи V
// выводить размер галереи
// экран открытия галереи
// блок увеличения вместительности галереи
// возможность открыть еще одну галерею

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const actions = this.props.actions
    setInterval(() => {
      const props = this.props.general
      if (props.loading) {
        actions.load()
      } else {
        const students = props.units[0]
        const dillers = props.units[1]
        if (students.level > 0) {
          actions.paint(1)
        }
        if (dillers.level > 0) {
          actions.autoSell()
        }
        this.pistureSell()
        if (props.galleriesIsActive) {
          actions.galleryWorking()
        }
        actions.chandePhase()
        actions.getPhrase()
        actions.save()

        console.log('___________')
      }
    }, 1000)
  }

  pistureSell = () => {
    this.props.general.paintings[0].forEach((paint, i) => {
      if (paint.status == 10) {
        paint.timeToSale -= 1
        if (paint.autoSell) {
          paint.timeFraction =
            paint.timeToSale / this.props.general.units[1].speed
        } else {
          paint.timeFraction = paint.timeToSale / this.props.general.speedOfSale
        }
        if (paint.timeToSale <= 0) {
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
            gallery={
              this.props.general.paintings[2][this.props.general.openGalleryId]
            }
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
