import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions'


const mapState = (state) => ({
  events: state.events
})

const actions = {
    deleteEvent
}

class EventDashboard extends Component {

    DeleteEvents = (eveniId) => () => {
      this.props.deleteEvent(eveniId);
      
    }


  render() {
     const { events } = this.props;
     
    return (
      <Grid>
            <Grid.Column width={10}>
              <h1>EventListItem</h1>
              <EventList 
                DeleteEvents={this.DeleteEvents}
                events={events}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              
            </Grid.Column>  
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard)


