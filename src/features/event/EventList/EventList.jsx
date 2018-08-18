import React, { Component } from 'react'
import EventListItem from './EventListItem';


class EventList extends Component {
  render() {
    const {events, handleEditEvent, handleDeleteEvents} = this.props;
    return (
      <div>
        {events.map((event) =>(
          <EventListItem 
            key={event.id} 
            event={event} 
            handleEditEvent={handleEditEvent}
            handleDeleteEvents={handleDeleteEvents}
        />
        ))}
        
      </div>
    )
  }
}

export default EventList
