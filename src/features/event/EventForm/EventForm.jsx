import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
};

class EventForm extends Component {
  state = {
    event: emptyEvent
  };
  componentDidMount() {
    // const {selectEvent} = this.props;
    if (this.props.selectEvent !== null) {
      this.setState({
        event: this.props.selectEvent
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('current : ', this.props.selectEvent);
    console.log('NextProps : ', nextProps.selectEvent);
    if (nextProps.selectEvent !== this.props.selectEvent) {
      this.setState({
        event: nextProps.selectEvent || emptyEvent
      });
    }
  }
  onFormSubmit = event => {
    const { handleCreateEvent, updateEvent } = this.props;
    event.preventDefault();
    if (this.state.event.id) {
      updateEvent(this.state.event);
    } else {
      handleCreateEvent(this.state.event);
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
    const { closeFormEvent } = this.props;
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
          <Button type="button" onClick={closeFormEvent}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
