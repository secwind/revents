import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailHeader = ({ event, isHost, isGoing, goingToEvent, cancelGoingToEvent }) => {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(eventDate, 'Do MMMM YYYY')} </p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
         {/* ถ้า isHost(เจ้าของโพส) !== true  ให้แสดงปุ่มจอยโพส หรือ ยกเลิก join post */}
        {!isHost && (
          <div>
            {/* ถ้า isGoing(มีการ join post ) === true  ให้แสดงปุ่ม Cancel My Place  และถ้าเป็น false ให้แสดงปุ่ม JOIN THIS EVENT */}
            {isGoing ? (
              <Button onClick={() =>cancelGoingToEvent(event)}>Cancel My Place</Button>
            ) : (
              <Button onClick={() => goingToEvent(event)} color="teal">JOIN THIS EVENT</Button>
            )}
          </div>
        )}
        {/* ถ้า isHost(เจ้าของโพส) === true  ให้แสดงปุ่ม Manage Event */}
        {isHost && (
          <Button
            color="orange"
            as={Link}
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailHeader;
