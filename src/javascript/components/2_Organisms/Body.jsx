import React, { Component } from 'react'

import Studio from './Studio.jsx'
import Shop from './Shop.jsx'
import Statistic from './Statistic.jsx'
import Study from './Study.jsx'

import Menu from '../1_Molecules/Menu.jsx'

export default class Content extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const pageId = this.props.page
    let page = ''

    if (pageId == 0) {
      page = <Studio />
    } else if (pageId == 1) {
      page = <Study />
    } else if (pageId == 2) {
      page = <Shop />
    } else if (pageId == 3) {
      page = <Statistic />
    } else {
      page = <div>LOL</div>
    }

    // <div className="border"></div>
    return (
      <div className="Content">
        <div className="GameHeader">
          <div className="CharacterBlock">
            <div className="Character"></div>
            <div className="Message">
              <h2>Клякса</h2>
              <p>Тут могла быть ваша реклама</p>
            </div>
          </div>
          <Menu pageid={pageId} onClick={this.props.changePage} />
        </div>
        <div className="Page">{page}</div>
      </div>
    )
  }
}
