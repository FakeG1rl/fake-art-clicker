import React, { Component } from 'react'
import Gallery from './Gallery.jsx'

export default class GalleriesCollection extends Component {
  constructor(props) {
    super(props)
  }

  renderGalleries = () => {
    const galleries = this.props.content
    const changeblock = this.props.changeblock
    let galleriesItems = []
    galleries.forEach((gallery, i) => {
      galleriesItems.push(
        <Gallery key={i} changeblock={changeblock} data={gallery} />
      )
    })
    return galleriesItems
  }

  render() {
    return (
      <div className={'GalleriesCollection ' + this.props.isActive}>
        <h1>{this.props.title}</h1>
        {this.renderGalleries()}
      </div>
    )
  }
}
