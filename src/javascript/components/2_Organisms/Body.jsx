import React, { Component } from 'react'

import Studio from './Studio.jsx'

export default class Content extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Content">
        <div className="border"></div>
        <div className="GameHeader">
          <div className="Character"></div>
          <div className="Message">
            <h2>Клякса</h2>
            <p>Тут могла быть ваша реклама</p>
          </div>
        </div>
        <div className="Page">
          <Studio />
        </div>
      </div>
    )
  }
}
