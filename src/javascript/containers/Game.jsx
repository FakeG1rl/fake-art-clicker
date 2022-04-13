import React from 'react'
import { connect } from 'react-redux'
// import * as GameActions from '../actions'
import { bindActionCreators } from 'redux'
import Clicker from '../components/2_Organisms/Clicker.jsx'
import Body from '../components/2_Organisms/Body.jsx'

import { paint, sell, chandePage } from '../actions/index.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Game">
        <Clicker />
        <Body
          page={this.props.general.pageid}
          changePage={this.props.actions.chandePage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ paint, sell, chandePage }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
