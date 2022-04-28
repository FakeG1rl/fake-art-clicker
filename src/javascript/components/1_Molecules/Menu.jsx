import React, { Component } from 'react'

export default class Students extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Menu">
        <div
          className={'settings p' + this.props.pageid}
          onClick={() => this.props.onClick(4)}
        >
          Настройки
        </div>
        <div
          className={'statistic p' + this.props.pageid}
          onClick={() => this.props.onClick(3)}
        >
          Статистика
        </div>
        <div
          className={'shop p' + this.props.pageid}
          onClick={() => this.props.onClick(2)}
        >
          Аукцион
        </div>
        <div className={'character p' + this.props.pageid}>Персонаж</div>
        <div
          className={'artists p' + this.props.pageid}
          onClick={() => this.props.onClick(1)}
        ></div>
      </div>
    )
  }
}

// <div className="bor"></div>
