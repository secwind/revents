import React from 'react';
import EventDetailHeader from './EventDetailHeader';
import EventDetailChat from './EventDetailChat';
import EventDetailInfo from './EventDetailInfo';
import EventDetailSidebar from './EventDetailSidebar';
import { Grid } from 'semantic-ui-react';

const EventDetailPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailInfo />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailPage;
