import React, { Component } from 'react'
import Band from '../../../assets/band.svg'
import Close from '../../../assets/close.svg'

export default class Banner extends Component {
  constructor(props) {
    super(props)
  }

  close = () => {
    const banner = document.getElementsByClassName('Banner')[0]
    banner.classList.add('hidden')
  }

  render() {
    return (
      <div className="Banner" onClick={this.close}>
        <div className="content">
          <div className="close">
            <span dangerouslySetInnerHTML={{ __html: Close }} />
          </div>
          <div className="characters">
            <span dangerouslySetInnerHTML={{ __html: Band }} />
          </div>
          <div className="text">
            <h1>Добро пожаловать</h1>
            <p>
              Рады, что ты к нам присоединился, скорее хватай кисти и вперет
              копировать картины!
            </p>
            <p>
              И помни, за исключение из художественной академии ты сможешь
              отомстить только когда заполонишь весь арт-рынок своими великими
              подделками!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

// <div className="bor"></div>
