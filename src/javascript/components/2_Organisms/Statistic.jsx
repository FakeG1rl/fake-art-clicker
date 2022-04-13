import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Statistic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let props = this.props.general
    return (
      <div className="Statistic">
        <p>Всего сделано кликов: {props.statistics.totalClick}</p>
        <p>Всего нарисованно картин: {props.statistics.totalPainting}</p>
        <p>Всего продано картин: {props.statistics.totalSales}</p>
        <p>
          Всего Заработано галереей:{' '}
          {new Intl.NumberFormat('en', {
            style: 'decimal',
            maximumFractionDigits: 3
          }).format(props.statistics.totalGalleryEarned)}{' '}
        </p>
        <p>
          Всего заработано:{' '}
          {new Intl.NumberFormat('en', {
            style: 'decimal',
            maximumFractionDigits: 3
          }).format(props.statistics.totalMoneys)}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  general: state.general
})

export default connect(mapStateToProps)(Statistic)
