import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Shop extends Component {
  constructor(props) {
    super(props)
  }

  picturesRender = (pictures) => {
    let picItems = []
    pictures.forEach((picture, i) => {
      picItems.push(
        <div className={'p' + i}>
          {picture.title}
          {picture.author}
          {picture.style}
          {picture.year}
        </div>
      )
    })
    return picItems
  }

  render() {
    const pictures = this.props.general.originals.slice(1)
    console.log(pictures)
    return <div className="Shop">{this.picturesRender(pictures)}</div>
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

export default connect(mapStateToProps)(Shop)
