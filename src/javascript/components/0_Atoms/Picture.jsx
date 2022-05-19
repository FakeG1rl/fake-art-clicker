import React, { Component } from 'react'

import { paint } from '../../actions/index.js'
import AltPictureBlock from '../1_Molecules/AltPictureBlock.jsx'

export default class Picture extends Component {
  constructor(props) {
    super(props)
  }

  renderBut = () => {
    const data = this.props.data

    let butItems = []
    let action = this.props.changeblock
    let text1 = ''
    let text2 = ''

    return butItems
  }

  dragStart = (e) => {
    const target = e.target
    const id = this.props.sourse + '/' + this.props.id
    e.dataTransfer.setData('picId', id)

    // var dragIcon = document.createElement('img');
    // dragIcon.src = 'http://...';
    // dragIcon.width = 100;
    // e.dataTransfer.setDragImage(dragIcon, x, y);

    setTimeout(() => {
      target.classList.add('draggable')
    }, 0)
  }
  dragEnd = (e) => {
    setTimeout(() => {
      e.target.classList.remove('draggable')
    }, 0)
  }
  dragOver = (e) => {
    e.stopPropagation()
  }

  render() {
    const picture = this.props.data
    const opacity = picture.timeFraction ? picture.timeFraction : 1

    const quo =
      picture.quality == 1
        ? '0'
        : picture.quality > 0.7
        ? '1'
        : picture.quality > 0.3
        ? '2'
        : '3'
    const className = 'Picture p_' + picture.referense.id + ' quo_' + quo
    let action = null

    if (picture.status == 0) {
      action = () => this.props.onPress(this.props.id)
    }
    // id={}
    return (
      <div
        id={this.props.sourse + '/' + this.props.id}
        className="Picture_wrap"
        draggable="true"
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        onDragOver={this.dragOver}
        style={{ opacity: opacity }}
      >
        <div className={className} onClick={action}>
          <AltPictureBlock data={picture} draggable="false" />
        </div>
        {this.renderBut()}
      </div>
    )
  }
}
