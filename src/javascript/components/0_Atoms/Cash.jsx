import React, { Component } from 'react'

export default class Cash extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Cash">
        <h2>
          $
          {new Intl.NumberFormat('en', {
            style: 'decimal',
            maximumFractionDigits: 2
          }).format(this.props.cash)}
        </h2>
        <p>
          {new Intl.NumberFormat('en', {
            style: 'decimal',
            maximumFractionDigits: 0
          }).format(this.props.clicks)}{' '}
          мазков для картины
        </p>
      </div>
    )
  }
}
