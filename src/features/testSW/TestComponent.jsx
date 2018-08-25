import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementAsync, decrementAsync } from './TestAction'
import { Button } from 'semantic-ui-react'
// import Script from 'react-load-script'
// import ModalManager from '../modals/ModalManager'
import { openModal } from '../modals/modalActions'



const mapState = (state) => ({
    data: state.test.data,
    loading: state.test.loading
})

const actions = {
    incrementAsync, 
    decrementAsync,
    openModal 
}



class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };





  render() {

      const { data, incrementAsync,  decrementAsync, openModal, loading} = this.props;
    return (
      <div>

        <h1>Test Store</h1>
        <h3>This Connect is {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color='green' content='Increment'/>
        <Button loading={loading} onClick={decrementAsync} color='red' content='Decrement'/>
        
        <Button onClick={() => openModal('TestModal', {data: 45})} color='teal' content='ModalProps'/>
        <br/><hr/>
        <form onSubmit={this.handleFormSubmit}>
        <button type="submit">Submit</button>
      </form>

      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent);
