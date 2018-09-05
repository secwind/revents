import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementAsync, decrementAsync } from './TestAction'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
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

      <Card>
    <Image src='http://www.abigcenter.co.th/pdf/sw01' />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>

      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent);
