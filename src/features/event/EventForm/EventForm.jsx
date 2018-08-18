import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

class EventForm extends Component {
  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.title.value);
    
  }
  render() {
    const { closeFormEvent } = this.props;
    return (
            <Segment>
              <Form onSubmit={this.onFormSubmit.bind(this)}>
                <Form.Field>
                  <label>Event Title</label>
                  <input ref='title' placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                  <label>Event Date</label>
                  <input ref='date' type="date" placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                  <label>Hosted By</label>
                  <input placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">
                  Submit
                </Button>
                <Button 
                  type="button"
                  onClick={closeFormEvent}
                >
                  Cancel
                </Button>
              </Form>
            </Segment>
    )
  }
}

export default EventForm
