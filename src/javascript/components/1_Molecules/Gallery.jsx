import React, { Component } from 'react'
import Picture from '../0_Atoms/Picture.jsx'

export default class Gallery extends Component {
  constructor(props) {
    super(props)
  }

  renderPictures = () => {
    const pictures = this.props.data.pictures
    let pictureItems = []

    pictures.forEach((picture, i) => {
      pictureItems.push(
        <Picture
          key={i}
          id={i}
          data={picture}
          onPress={() => console.log('click')}
          changeblock={this.props.changeblock}
        />
      )
    })
    return pictureItems
  }

  render() {
    return <div className="Gallery">{this.renderPictures()}</div>
  }
}

// key={i}
// id={i}
// data={pictures[i]}
// onPress={onPress}
// changeblock={this.props.changeblock}
