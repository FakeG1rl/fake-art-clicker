import React from 'react'
import { connect } from 'react-redux'
// import * as GameActions from '../actions'
import { bindActionCreators } from 'redux'
import Clicker from '../components/2_Organisms/Clicker.jsx'
import Studio from '../components/2_Organisms/Studio.jsx'

import { paint, sell } from '../actions/index.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Game">
        <Clicker />
        <Studio />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ paint, sell }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
