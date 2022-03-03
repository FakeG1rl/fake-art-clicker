import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sell, studioUpdate, hiring } from '../../actions/index.js'

import Block from '../1_Molecules/Block.jsx'
import StudioShop from './StudioShop.jsx'

class Studio extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Studio">
        <StudioShop
          units={this.props.general.units}
          hiringUnit={this.props.actions.hiring}
          update={this.props.actions.studioUpdate}
          updates={this.props.general.studioUpdate}
        />
        <Block
          title="Продукция"
          pictures={this.props.general.paintingsDone}
          onPress={this.props.actions.sell}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ sell, studioUpdate, hiring }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Studio)
