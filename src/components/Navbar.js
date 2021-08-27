import React, { Component } from 'react'
import { connect } from 'react-redux'
import Identicon from 'identicon.js';
import eth from '../images/eth.png'
import {
  accountSelector,
  balanceSelector,
  networkSelector,
  web3Selector
} from '../store/selectors'
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faCoins } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg rounded-bottom navBorderBottom navbar-custom-style" style={{ color: "#FFFFFF", "backgroundColor": "#000000" }}>
        <a
          className="navbar-brand homelink"
          href="/"
        >
            <b>Beers</b>
        </a>
          { this.props.account
          ? <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto col-md-4">
                <div>
                  <div className="row" style={{fontSize: "20px"}}>
                    <div className="rounded network">
                      <li className="nav-item nav-link small">
                      <FontAwesomeIcon icon={faGlobe} />
                        <b style={{margin: "5px"}}>{this.props.network}</b>
                      </li>
                    </div>
                    <div className="rounded balance">
                      <li className="nav-item nav-link small">
                      <FontAwesomeIcon icon={faCoins} />
                        <b style={{margin: "5px"}}>{this.props.balance} eth</b>
                      </li>
                    </div>
                    <div className="rounded account">
                      <li className="nav-item nav-link small">
                        { this.props.network === 'Main' || this.props.network === 'Private' || this.props.network === 'Wrong network'
                        ? <b><a
                            style={{ color: "#55FF55" }}
                            href={`https://etherscan.io/address/` + this.props.account}
                            target="_blank"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          {this.props.account.substring(0,5) + '...' + this.props.account.substring(38,42)}
                          &nbsp;
                          </a></b>
                        : <b><a
                            style={{color: "#000000"}}
                            href={`https://${this.props.network}.etherscan.io/address/` + this.props.account}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          {this.props.account.substring(0,6) + '...' + this.props.account.substring(38,42)}
                          </a></b>
                        }
                        <img
                          alt="id"
                          className="id border border-success"
                          style = {{marginLeft: "5px"}}
                          width="30"
                          height="30"
                          src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        />
                      </li>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          : <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                { this.props.web3
                ? <button
                    className="btn btn-warning btn-block button"
                    onClick={async () => {
                      try {
                        await window.ethereum.enable()
                      } catch (e) {
                        console.log(e)
                      }
                    }}
                  >
                    Connect Wallet
                  </button>
                : <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                      try {
                        window.open("https://metamask.io/")
                      } catch (e) {
                        console.log(e)
                      }
                    }}
                  >
                    Get MetaMask
                  </button>
                }
              </ul>
            </div>
          }
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    web3: web3Selector(state),
    account: accountSelector(state),
    network: networkSelector(state),
    balance: balanceSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar)