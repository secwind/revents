import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

class EventListItem extends Component {
  render() {
    const { event,  DeleteEvents } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date, 'dddd Do MMMM')} at {' '} {format(event.date, 'HH:mm')}  {' '} 
            |<Icon name="marker" />{' '} {event.venue}
            
          </span>
        </Segment>
        <Segment secondary>
          {/* todo: attendees go here  // เป็นรูปเพื่อนที่ comments */}
          <List horizontal>
            {event.attendees &&
              event.attendees.map(attendee => (
                <EventListAttendee event={attendee} key={attendee.id} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            onClick={DeleteEvents(event.id)}
            as='a'
            color="red"
            floated="right"
            content="Delete"
          />
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
