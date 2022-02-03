import React, {Component} from "react"

import Dillers from "../0_Atoms/Dillers.jsx"
import Wallet from "../0_Atoms/Wallet.jsx"


export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='Header'>
        <div className="logo"></div>
        <Wallet cash={this.props.cash}/>
        <Dillers dillers={this.props.dillers}/>
      </div>
    )
  }
}
