import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete  from 'react-places-autocomplete'


// ทำให้ตอน AutoComplete DropDown ลงมาแล้วเป็นพื้นทึบ
const styles = {
    autocompleteContainer: {
        zIndex: 1000
    }
}

class PlaceInput extends Component {
    state = {
        scriptLoaded: false
    }

    handleSrciptLoaded = () => this.setState({ scriptLoaded: true })
  render() {
      const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDDyDxF3OENXx4s3v_EFCltoQmeJqhcAYM&libraries=places'
          onLoad={this.handleSrciptLoaded}
        />
        {
            this.state.scriptLoaded && 
            <PlacesAutocomplete
                inputProps={{...input, placeholder}}
                options={options}
                onSelect={onSelect}
                styles={styles}
            />
        }
        {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    )
  }
}

export default PlaceInput
