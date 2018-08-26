import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'


const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
    deleteEvent
}

class EventDashboard extends Component {

    DeleteEvents = (eveniId) => () => {
      this.props.deleteEvent(eveniId);
      
    }


  render() {
     const { events, loading } = this.props;
     if (loading) {
        return <LoadingComponent inverted={true}/>
     }
    
    return (
      <Grid>
            <Grid.Column width={10}>
              <EventList 
                DeleteEvents={this.DeleteEvents}
                events={events}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventActivity/>
            </Grid.Column>  
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard)


