import React, { Component } from 'react'

export default class UpgradesCollection extends Component {
  constructor(props) {
    super(props)
  }

  renderUpgrades = () => {
    const upgrades = this.props.upgrade
    const onClick = this.props.onPress
    let upgradesItems = []
    upgrades.forEach((upgrade, i) => {
      upgradesItems.push(
        <div className="upgrade" onClick={() => onClick(i)} key={i}>
          {upgrade.title}
        </div>
      )
    })
    return upgradesItems
  }

  render() {
    return <div className={'UpgradesCollection'}>{this.renderUpgrades()}</div>
  }
}
