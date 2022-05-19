import React, { Component } from 'react'
import PicturesCollection from '../1,5_Collections/PicturesCollection.jsx'

export default class GalleryBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="GalleryBlock">
        <PicturesCollection
          sourse={this.props.area + '/' + this.props.id}
          pictures={this.props.data.pictures}
          changeblock={this.props.changeblock}
        />

        <div
          className="but"
          onClick={() => this.props.changePage(5, this.props.id)}
        >
          открыть
        </div>
      </div>
    )
  }
}

// key={i}
// id={i}
// data={pictures[i]}
// onPress={onPress}
// changeblock={this.props.changeblock}
