import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { save, reset } from '../../actions/index.js'

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let actions = this.props.actions
    return (
      <div className="Settings">
        <div className="but" onClick={() => actions.save(true)}>
          Сохранить
        </div>
        <div className="but" onClick={actions.reset}>
          Сбросить сохранение
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ save, reset }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
