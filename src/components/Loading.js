import ReactTypingEffect from 'react-typing-effect';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Style.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading text-center centered pt-5" style={{ color: "#55FF55" }}>
        <br></br>
        <br></br>
        <br></br>
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <br></br>
        <br></br>
        <br></br>
        <h2 class="loading-message">Please Wait</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Loading)