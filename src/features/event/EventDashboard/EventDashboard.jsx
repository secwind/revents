import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { compose } from 'redux';

const query = ({ auth }) => {
  return [
    {
      collection: 'activity',
      orderBy: ['timestamp', 'desc'],
      limit: 10
    },
    {
      collection: 'users',
      doc: auth.uid,
      storeAs: 'storeAsUsers'
    }
  ]
}

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
  user: state.firestore.ordered.storeAsUsers,
  auth: state.firebase.auth
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    initialLoading: true,
    newEvent: [],
    context: {}
  };

  // DeleteEvents = (eveniId) => () => {
  //   this.props.deleteEvent(eveniId);

  // }
  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    // console.log(next);

    // ถ้า func getEventsForDashboard มีข้อมูลส่งมามากกว่า 0 ตัว ให้ setState
    if (next && next.docs && next.docs.length > 0) {
      this.setState({
        moreEvents: true,
        initialLoading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // เริ่มต้น this.props.events จะได้เป็น [] เสมอ //nextProps.events คือข้อมูลที่ได้จากการ query firestore
    if (this.props.events !== nextProps.events) {
      // เงื่อนไขคือให้ push this.state.newEvent ไปเรื่อยๆด้วยเอาข้อมูลมาเพิ่มจาก ...nextProps.events
      this.setState({
        newEvent: [...this.state.newEvent, ...nextProps.events]
      })
    }
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // Are we adding new items to the list?
  //   // Capture the scroll position so we can adjust scroll later.
  //   if (prevState.newEvent.length !== this.props.events.length) {
  //     const event = [...prevProps.events, this.props.events.filter(item => item.id !== prevProps.events.id)]
  //     console.log(event);
  //     return event
  //   }
  //   return null;
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {

  //   if (snapshot !== null) {
  //     const newDataUpdate = this.state.newEvent;
  //     this.setState({
  //       newEvent: [...prevState.newEvent, ]
  //     })
  //   }
  // }

  getNextEvents = async () => {
    const { events, getEventsForDashboard} = this.props;
    // lastEvent คือการ get ข้อมูลตัวสุดท้าย แล้วเอา lastEvent ไปทำ func statAfter query อีกที
    let lastEvent = events && events[events.length - 1];
    // console.log(lastEvent);
    let next = await getEventsForDashboard(lastEvent);
    // console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { loading, activities,  user  } = this.props;
    const { newEvent, moreEvents } = this.state;
    if (this.state.initialLoading) {
      return <LoadingComponent inverted={true} />;
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <EventList
              events={newEvent}
              loading={loading}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>

        <Grid.Column width={6}>
          <EventActivity
            user={user}
            activities={activities}
            contextRef={this.state.contextRef}
          />
        </Grid.Column>

        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(connect(mapState, actions), firestoreConnect(props => query(props))) (EventDashboard)


