import React, { Component } from 'react'

import Studio from './Studio.jsx'
import Shop from './Shop.jsx'
import Statistic from './Statistic.jsx'
import Study from './Study.jsx'
import Settings from './Settings.jsx'
import Gallery from './Gallery.jsx'

import Menu from '../1_Molecules/Menu.jsx'

import Back from '../../../assets/back.svg'

export default class Content extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const pageId = this.props.page
    const phase = this.props.phase
    let page = ''

    if (pageId == 0) {
      page = <Studio />
    } else if (pageId == 1) {
      page = <Study />
    } else if (pageId == 2) {
      page = <Shop />
    } else if (pageId == 3) {
      page = <Statistic />
    } else if (pageId == 4) {
      page = <Settings />
    } else if (pageId == 5) {
      page = <Gallery data={this.props.gallery} />
    } else {
      page = <div>LOL</div>
    }

    // <div className="border"></div>
    return (
      <div className="Content">
        <div className="GameHeader">
          <div
            className={'back p' + pageId}
            onClick={() => this.props.changePage(0)}
          >
            <span dangerouslySetInnerHTML={{ __html: Back }} />
          </div>

          <div className="cover"></div>
          <div className="CharacterBlock">
            <div className="Character"></div>
            <div className="Message">
              <h2>Клякса</h2>
              <p>{this.props.phrase}</p>
            </div>
          </div>
          <Menu pageid={pageId} onClick={this.props.changePage} />
        </div>
        <div className="Page">
          <div className="wrapper 1">
            <div className="Cover_top"></div>
          </div>
          <div className="wrapper 2">
            <div className="Cover_left_1"></div>
          </div>
          <div className="wrapper 3">
            <div className="Cover_left_2"></div>
          </div>
          <div className="wrapper 4">
            <div className="Cover_rigth_1"></div>
          </div>
          <div className="wrapper 5">
            <div className="Cover_rigth_2"></div>
          </div>
          <div className="Part">{page}</div>
        </div>
      </div>
    )
  }
}
