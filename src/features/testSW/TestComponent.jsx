import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementConuter, decrementConuter } from './TestAction'
import { Button, Icon } from 'semantic-ui-react'
// import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapReact from 'google-map-react';

const mapState = (state) => ({
    data: state.test.data
})

const actions = { incrementConuter, decrementConuter }

const Marker = () => <Icon name='marker' size='big' color='red'/>

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = {
    address:'',
    srciptLoaded: false
  }

  handleScriptLoaded = () => {
    this.setState({srciptLoaded: true})
  }


  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => this.setState({address});

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
      const { data, incrementConuter,  decrementConuter} = this.props;
    return (
      <div>
        {/* <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDDyDxF3OENXx4s3v_EFCltoQmeJqhcAYM&libraries=places'
          onLoad={this.handleScriptLoaded}
        /> */}
        <h1>Test Store</h1>
        <h3>This Connect is {data}</h3>
        <Button onClick={incrementConuter} color='green' content='Increment'/>
        <Button onClick={decrementConuter} color='red' content='Decrement'/>
        <br/><hr/>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.srciptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>

             {/* Important! Always set the container height explicitly */}
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDDyDxF3OENXx4s3v_EFCltoQmeJqhcAYM' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent);
