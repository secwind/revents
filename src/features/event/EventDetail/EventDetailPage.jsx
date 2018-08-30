import React, { Component } from 'react';
import EventDetailHeader from './EventDetailHeader';
import EventDetailChat from './EventDetailChat';
import EventDetailInfo from './EventDetailInfo';
import EventDetailSidebar from './EventDetailSidebar';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { objectToArray } from '../../../app/common/unit/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userAction';

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return {
    event,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
    //attendees = ถ้ามี state.firestore.oredered.events && ใน events มี attendees && objectToArray คือ event.attendees[0] ตัวแรก
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    //isHost คือตัวแปลว่าความเป็นเจ้าของ ถ้าไม่มี isHost ก็ไม่สามารถแก้ไข event ได้
    const isHost = event.hostUid === auth.uid;
    //isHost = attendees.soome ให้ a.id หรือ id ทุกตรวจสอตัวของ attendees ตรวจสอบว่าทีตัวไหน === auth.uid หรือเรียกว่าตรงกับ id ผู้ที่กำลังใช้งานไหม ถ้ามีให้ trurn -> true ถ้าไม่มี  trurn -> false
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailInfo event={event} />
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailPage)
);
