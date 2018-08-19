import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementConuter, decrementConuter } from './TestAction'
import { Button } from 'semantic-ui-react'

const mapState = (state) => ({
    data: state.test.data
})

const actions = { incrementConuter, decrementConuter }

class TestComponent extends Component {
  render() {
      const { data, incrementConuter,  decrementConuter} = this.props;
    return (
      <div>
        <h1>Test Store</h1>
        <h3>This Connect is {data}</h3>
        <Button onClick={incrementConuter} color='green' content='Increment'/>
        <Button onClick={decrementConuter} color='red' content='Decrement'/>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent);
