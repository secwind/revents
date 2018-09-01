import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List, Label } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { objectToArray } from '../../../app/common/unit/helpers'

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    // event คือก้อน object ทั้งหมดของ firestore.ordered.events 
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostphotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled && 
                <Label style={{top: '-40px'}} ribbon='right' color='red' content='This event has been canceled' />}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at {' '} {format(event.date.toDate(), 'HH:mm')}  {' '} 
            |<Icon name="marker" />{' '} {event.venue}
            
          </span>
        </Segment>
        <Segment secondary>
          {/* todo: attendees go here  // เป็นรูปเพื่อนที่ comments */}
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map((attendee)=> (
                <EventListAttendee attendee={attendee} key={attendee.id} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
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
