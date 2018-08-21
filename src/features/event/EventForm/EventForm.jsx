import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import {createEvent, updateEvent } from './../eventActions'
import uuid from "uuid";

const mapState = (state, urlProps) => {
    const eventId = urlProps.match.params.id;

    let event = {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
      event = state.events.filter(event => event.id === eventId)[0];
    }

    return { event }

}

const actions = {
  createEvent, updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event) 
  };

  onFormSubmit = event => {
    const { createEvent, updateEvent } = this.props;
    event.preventDefault();

    if (this.state.event.id) {
      updateEvent(this.state.event)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...this.state.event,
        id: uuid(),
        hostPhotoURL: '/asstes/images/user.pgn'
      }
      createEvent(newEvent)
      this.props.history.push('/events')
    }
    
  };

  onChange = e => {
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState({
      event: newEvent
    });
  };
  render() {
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              onChange={this.onChange.bind(this)}
              placeholder="First Name"
              value={event.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              onChange={this.onChange.bind(this)}
              type="date"
              placeholder="Event Date"
              value={event.date}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.onChange.bind(this)}
              placeholder="City event is taking place"
              value={event.city}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              onChange={this.onChange.bind(this)}
              placeholder="Enter the Venue of the event"
              value={event.venue}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              onChange={this.onChange.bind(this)}
              placeholder="Enter the name of person hosting"
              value={event.hostedBy}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
