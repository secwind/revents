import React, { Component } from 'react'
import { Grid, Loader} from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { getEventsForDashboard } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'


const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
  getEventsForDashboard
}

class EventDashboard extends Component {
    state = {
      moreEvents : false,
      initialLoading: true,
      newEvent: []
    }

    // DeleteEvents = (eveniId) => () => {
    //   this.props.deleteEvent(eveniId);
      
    // }
    async componentDidMount() {
    let next =  await this.props.getEventsForDashboard()
    // console.log(next);

      // ถ้า func getEventsForDashboard มีข้อมูลส่งมามากกว่า 1 ตัว ให้ setState
      if (next && next.docs && next.docs.length > 1) {
        this.setState({
          moreEvents: true,
          initialLoading: false
        })
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

    getNextEvents = async () => {
      const {events, getEventsForDashboard} = this.props
      // lastEvent คือการ get ข้อมูลตัวสุดท้าย แล้วเอา lastEvent ไปทำ func statAfter query อีกที
      let lastEvent = events && events[events.length -1]
      // console.log(lastEvent);
      let next = await getEventsForDashboard(lastEvent)
      console.log(next);
      if (next && next.docs && next.docs.length <= 1) {
        this.setState({
          moreEvents: false
        })
      }
      
    }



  render() {
     const { loading } = this.props;
     const { newEvent, moreEvents } = this.state
     if (this.state.initialLoading) {
        return <LoadingComponent inverted={true}/>
     }
    
    return (
      <Grid>
            <Grid.Column width={10}>
              <EventList 
                events={newEvent}
                loading={loading}
                moreEvents={moreEvents}
                getNextEvents={this.getNextEvents}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventActivity/>
            </Grid.Column> 
            <Grid.Column width={10}>
             <Loader active={loading}/>
              </Grid.Column> 
      </Grid>
    )
  }
}

export default 
  connect(mapState, actions)(
    firestoreConnect([{ collection: 'events' }])(EventDashboard)
  )
  
  


