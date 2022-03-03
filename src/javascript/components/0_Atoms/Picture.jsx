import React, { Component } from 'react'

import { paint } from '../../actions/index.js'

export default class Picture extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="Picture" onClick={this.props.onPress}></div>
  }
}
