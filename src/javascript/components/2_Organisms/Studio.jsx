import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sell, studioUpdate, hiring, changeblock } from '../../actions/index.js'

import Block from '../1_Molecules/Block.jsx'
import StudioShop from './StudioShop.jsx'
import GalleriesCollection from '../1_Molecules/GalleriesCollection.jsx'

class Studio extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props.general
    const actions = this.props.actions
    return (
      <div className="Studio">
        <p>{props.study.skill}</p>
        <p>|||||||||||||||||||</p>
        <div className="StudioContent">
          <Block
            title="Образцы"
            pictures={props.paintings[1]}
            changeblock={actions.changeblock}
            onPress={() => console.log('click')}
          />
          <Block
            title="Продукция"
            pictures={props.paintings[0]}
            changeblock={actions.changeblock}
            onPress={actions.sell}
          />
          <GalleriesCollection
            title="Галереи"
            changeblock={actions.changeblock}
            content={props.paintings[2]}
          />
        </div>
        <StudioShop
          units={props.units}
          hiringUnit={actions.hiring}
          update={actions.studioUpdate}
          updates={props.studioUpdate}
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
    { sell, studioUpdate, hiring, changeblock },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Studio)
