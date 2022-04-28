import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { study } from '../../actions/index.js'

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
            onClick={() => this.props.actions.study(pic)}
          ></div>
          <p>{pic.title}</p>
          <p>
            Стоимость обучения{' '}
            {Math.floor(
              (pic.cost * 1.15 ** this.props.general.study.studyCount) / 100
            )}
          </p>
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

    // <p>Стоимость обучения {this.props.general.study.studyCoast}</p>
    return (
      <div className="Study">
        <p>Мастерство {this.props.general.study.skill}</p>
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
  actions: bindActionCreators({ study }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Study)
