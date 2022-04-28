import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getOriginal } from '../../actions/index.js'

class Shop extends Component {
  constructor(props) {
    super(props)
  }

  picturesRender = (pictures) => {
    let picItems = []
    pictures.forEach((picture, i) => {
      picItems.push(
        <div
          className={'p' + i}
          onClick={() => this.props.actions.getOriginal(i)}
        >
          {picture.title}
          {picture.author}
          {picture.style}
          {picture.year}
          <br />
          <b>{picture.cost}</b>
          <br />
          <br />
        </div>
      )
    })
    return picItems
  }

  render() {
    const pictures = this.props.general.originals.slice(1)
    return <div className="Shop">{this.picturesRender(pictures)}</div>
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getOriginal }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
