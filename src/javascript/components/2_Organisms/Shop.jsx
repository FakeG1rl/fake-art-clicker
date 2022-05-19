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
          className="picture"
          onClick={() => this.props.actions.getOriginal(i)}
        >
          <div className={'img s_' + i + ' ' + picture.position}></div>
          <div className="content">
            <p>{picture.title}</p>
            <h3>
              F$
              {new Intl.NumberFormat('en', {
                style: 'decimal',
                maximumFractionDigits: 2
              }).format(picture.cost)}
            </h3>
          </div>
        </div>
      )
    })
    return picItems
  }

  render() {
    const pictures = this.props.general.originals.slice(1)
    return (
      <div className="Shop">
        <div className="picturesCollection">
          {this.picturesRender(pictures)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getOriginal }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
