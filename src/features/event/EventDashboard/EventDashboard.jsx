import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import  cuid  from 'cuid'
import { connect } from 'react-redux'
import { createEvent, updateEvent, deleteEvent } from '../eventActions'


const mapState = (state) => ({
  events: state.events
})

const actions = {
    createEvent, updateEvent, deleteEvent
}

class EventDashboard extends Component {

    state = {
      isOpen: false,
      selectEvent: null
    }
  
    openFormEvent = (think) => {
      this.setState({
        isOpen: !this.state.isOpen,
        selectEvent: null
      })
      console.log(think);
      
    }

    closeFormEvent = () => {
      this.setState({
        isOpen: false
      })
    }

    updateEvent = (dataUpdate) => {
        this.setState({
          events: this.state.events.map((event) => {
            if (event.id === dataUpdate.id) {
              return Object.assign({}, dataUpdate);
            } else {
              return event
            }
          }), 
          isOpen: false,
          selectEvent: null
        })
    }

    handleEditEvent = (updateEvent) => () => {
      this.setState({
        selectEvent:updateEvent,
        isOpen: true
      })
    }

    handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = 'assets/images/user.png';
      const updateEvent = [...this.state.events, newEvent];
      this.setState({
        events: updateEvent,
        isOpen: false
      })
    }

    handleDeleteEvents = (eveniId) => () => {
      this.props.deleteEvent(eveniId);
      
    }


  render() {
     const { isOpen } = this.state;
     const { events } = this.props;
     
    return (
      <Grid>
            <Grid.Column width={10}>
              <h1>EventListItem</h1>
              <EventList 
                handleDeleteEvents={this.handleDeleteEvents}
                events={events}
                handleEditEvent={this.handleEditEvent}
                
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Button 
                onClick={this.openFormEvent.bind(this,'เปิด-ปิด ฟอร์ม')}
                positive content='Create Event'
              />
              {isOpen && 
                <EventForm 
                  closeFormEvent={this.closeFormEvent.bind(this)}
                  updateEvent={this.updateEvent}
                  handleCreateEvent={this.handleCreateEvent}
                  selectEvent={this.state.selectEvent}
                />}
              
            </Grid.Column>  
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard)


