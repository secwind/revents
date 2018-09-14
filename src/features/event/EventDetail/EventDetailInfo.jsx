import React, { Component } from 'react';
import { Segment, Icon, Grid, Button } from 'semantic-ui-react';
import EventDetailMap from './EventDetailMap';
import format from 'date-fns/format';

class EventDetailInfo extends Component {
  state = {
    showMap: false
  };

  componentWillUnmount() {
    this.setState({
      showMap: false
    });
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      // showMap คือแสดงแผนที่ใน googleMap
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { event } = this.props;
    let eventDate;
    if (event.date) {
      eventDate = event.date.toDate();
    }
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(eventDate, 'dddd Do MMMM')} at{' '}
                {format(eventDate, 'h:mm A')}{' '}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                color={
                  this.state.showMap ? 'teal' : 'orange'
                }
                size="tiny"
                content={
                  this.state.showMap ? 'ซ่อนแผนที่' : 'ดูแผนที่'
                }
                onClick={this.showMapToggle}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <EventDetailMap
            lat={event.venueLatLng.lat}
            lng={event.venueLatLng.lng}
          />
        )}
      </Segment.Group>
    );
  }
}

export default EventDetailInfo;
