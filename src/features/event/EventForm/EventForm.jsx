/*global google*/
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent, cancelToggle } from './../eventActions';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
  // hasLengthLessThan
} from 'revalidate';
import DateInput from '../../../app/common/form/DateInput';
// import moment from 'moment' //อันนี้ขาดไม่ได้เลย ถ้าใช้ของ DateInput
import PlaceInput from '../../../app/common/form/PlaceInput';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withFirestore } from 'react-redux-firebase';

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0])
    event = state.firestore.ordered.events[0];

  return {
    initialValues: event,
    event
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'กรุณากรอกข้อมูลด้วยค่ะ!!' }),
  category: isRequired({ message: 'กรุณากรอกข้อมูลด้วยค่ะ!!' }),
  description: composeValidators(
    isRequired({ message: 'กรุณากรอกข้อมูลด้วยค่ะ!!' }),
    hasLengthGreaterThan(4)({
      message: 'กรุณากรอกข้อมูลอย่างน้อย 4 ตัวอักษรค่ะ!!'
    })
    // hasLengthLessThan(255)({
    //   message: 'กรุณากรอกรหัสมากสุด 255 ตัวอักษรค่ะ!!'
    // })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('กรุณาใส่วันที่ด้วยค่ะ!!')
});

class EventForm extends Component {
    state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };
 
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleSrciptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectCity => {
    geocodeByAddress(selectCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({ 
          cityLatLng: latlng 
        })
      })
      .then(() => {
        this.props.change('city', selectCity)
      })
  }

  handleVenueSelect = selectVenue => {
    geocodeByAddress(selectVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({ 
          venueLatLng: latlng 
        })
      })
      .then(() => {
        this.props.change('venue', selectVenue)
      })
  };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    ///  values คือ data ทั้งหมดของ form submit เกิดจาก redux form API
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push('/events');
    }
  };



  // onChange = e => {
  //   const newEvent = this.state.event;
  //   newEvent[e.target.name] = e.target.value;
  //   this.setState({
  //     event: newEvent
  //   });
  // };

 
  render() {
    const { invalid, submitting, pristine, event, cancelToggle } = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDyDxF3OENXx4s3v_EFCltoQmeJqhcAYM&libraries=places"
          onLoad={this.handleSrciptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give Me your name..."
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                //multiple={true} // แปลว่า อนุญาตให้สามารถ Select หรือ เลือกได้มากกว่า 1 อย่าง
                placeholder="เลือกประเภทกิจกรรมที่คุณต้องการ"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Description..."
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ type: ['cities'] }}
                placeholder="Your City..."
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    type: ['establishment']
                  }}
                  placeholder="Event Venue..."
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and Time of event"
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
                color={event.cancelled ? 'green' : 'red'}
                floated="right"
                content={event.cancelled ? 'Reactive Event' : 'Cancel Event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventform', enableReinitialize: true, validate })(
      EventForm
    )
  )
);
