import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getOriginal } from '../../actions/index.js'

class Study extends Component {
  constructor(props) {
    super(props)
  }

  getAuthors = (pictures) => {
    let authors = new Set()

    pictures.forEach((pic, i) => {
      const aut = pic.author
      authors.add(aut)
    })
    return authors
  }

  renderPictures = (pictures, author) => {
    let autPictures = new Set()
    let pictureItems = []
    pictures.forEach((pic, i) => {
      if (pic.author == author) {
        autPictures.add(pic)
      }
    })

    autPictures.forEach((pic, i) => {
      pictureItems.push(
        <div>
          <div
            className={'pic p' + pic.id}
            onClick={() => this.props.actions.getOriginal(pic)}
          ></div>
          {pic.title}
        </div>
      )
    })
    return <div className="picturesCollection">{pictureItems}</div>
  }

  renderAuthors = (pictures) => {
    let authorItems = []
    this.getAuthors(pictures).forEach((author, i) => {
      authorItems.push(
        <div className="authorBlock">
          <p>{author}</p>
          {this.renderPictures(pictures, author)}
          <br />
        </div>
      )
    })

    return authorItems
  }

  render() {
    const pictures = this.props.general.originals.slice(1)

    return (
      <div className="Study">
        <p>УЧителя</p>
        <br />
        <p>{this.renderAuthors(pictures)}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Study)
