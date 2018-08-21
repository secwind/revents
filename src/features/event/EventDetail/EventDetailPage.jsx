import React from 'react';
import EventDetailHeader from './EventDetailHeader';
import EventDetailChat from './EventDetailChat';
import EventDetailInfo from './EventDetailInfo';
import EventDetailSidebar from './EventDetailSidebar';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'

const mapState = ( state, urlProps) => {
  const eventId = urlProps.match.params.id

  let event = {}

  if (eventId && state.events.length > 0) {
    event =  state.events.filter(event => eventId === event.id)[0];
  }
  return { event }
}


const EventDetailPage = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader  event={event}/>
        <EventDetailInfo  event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetailPage);
