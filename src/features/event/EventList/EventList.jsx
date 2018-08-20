import React, { Component } from 'react'
import EventListItem from './EventListItem';


class EventList extends Component {
  render() {
    const {events, handleEditEvent, DeleteEvents} = this.props;
    return (
      <div>
        {events.map((event) =>(
          <EventListItem 
            key={event.id} 
            event={event} 
            handleEditEvent={handleEditEvent}
            DeleteEvents={DeleteEvents}
        />
        ))}
        
      </div>
    )
  }
}

export default EventList
