import React from 'react'
import { connect } from 'react-redux'
import * as GameActions from '../actions'
import { bindActionCreators } from 'redux'
import Clicker from '../components/2_Organisms/Clicker.jsx'

// const Game = ({ test }) => (
//   <div className="Game">
//     {test}
//     <Clicker />
//   </div>
// )

class Game extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.general.test)
    console.log(props.yo)
  }

  render() {
    return (
      <div className="Game">
        <Clicker />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general[0]
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(GameActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
