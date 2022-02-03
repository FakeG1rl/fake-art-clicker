import React, {Component} from "react"

export default class Student extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const number = this.props.number
    const angle = 'rotate('+ number * 14 + 'deg)'

    let style = {
      transform: angle,
    }

    if (number <= 7) {
      style['margin-left'] = number * 20 + 'px'
    } else if ( 7 < number < 13) {
      console.log(number);
      style['margin-left'] = 140 - (number - 7) * 20 + 'px'
    } else if (13 < number < 17) {
      style['margin-left'] = '-' + number * 20 + 'px'
    } 

    if (number < 13) {
      style['top'] = number * 35 + 'px'
    } else {
      style['top'] = (number - 13) * 35 + 'px'
    }
    // const top = number * 35 + 'px'
    // const bottom = number * 35 + 'px'

    return (
      <div className='Student' style={style}>
      </div>
    )
  }
}
