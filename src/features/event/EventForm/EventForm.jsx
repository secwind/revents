/*global google*/
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './../eventActions';
import uuid from 'uuid';
import { reduxForm, Field } from 'redux-form';
import TextInput from './../../../app/form/TextInput';
import TextArea from './../../../app/form/TextArea';
import SelectInput from './../../../app/form/SelectInput';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
  // hasLengthLessThan
} from 'revalidate';
import DateInput from './../../../app/form/DateInput';
import moment from 'moment' //อันนี้ขาดไม่ได้เลย ถ้าใช้ของ DateInput
import PlaceInput from './../../../app/form/PlaceInput';
import Script from 'react-load-script'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const mapState = (state, urlProps) => {
  const eventId = urlProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
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
      venueLatLng:{},
      scriptLoaded: false
    }

    handleCitySelect = (selectCity) => {
      geocodeByAddress(selectCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({cityLatLng: latlng})
      })
      .then(() => {
        this.props.change('city', selectCity)
      })
    }

    handleVenueSelect = (selectVenue) => {
      geocodeByAddress(selectVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({venueLatLng: latlng})
      })
      .then(() => {
        this.props.change('venue', selectVenue)
      })
    }

  onFormSubmit = values => {
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng
    const { createEvent, updateEvent, initialValues } = this.props;
    ///  values คือ data ทั้งหมดของ form submit เกิดจาก redux form API
    if (initialValues.id) {
      updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: uuid(),
        hostPhotoURL: '/assets/images/user.png',
        hostedBy: 'Bob'
      };
      createEvent(newEvent);
      this.props.history.push('/events');
    }

    // const { createEvent, updateEvent } = this.props;
    // event.preventDefault();

    // if (this.state.event.id) {
    //   updateEvent(this.state.event);
    //   this.props.history.goBack();
    // } else {
    //   const newEvent = {
    //     ...this.state.event,
    //     id: uuid(),
    //     hostPhotoURL: '/assets/images/user.png'
    //   };
    //   createEvent(newEvent);
    //   this.props.history.push('/events');
    // }
  };

  // onChange = e => {
  //   const newEvent = this.state.event;
  //   newEvent[e.target.name] = e.target.value;
  //   this.setState({
  //     event: newEvent
  //   });
  // };
  handleSrciptLoaded = () => this.setState({ scriptLoaded: true })
  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDDyDxF3OENXx4s3v_EFCltoQmeJqhcAYM&libraries=places'
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
                options={{type: [('cities')] }}
                placeholder="Your City..."
                onSelect={this.handleCitySelect}
              />
              {
                this.state.scriptLoaded &&
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
              }
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat='HH:mm'
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
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: 'eventform', enableReinitialize: true, validate })(
    EventForm
  )
);
