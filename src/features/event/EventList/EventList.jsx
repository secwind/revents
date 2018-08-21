import React, { Component } from 'react'
import EventListItem from './EventListItem';


class EventList extends Component {
  render() {
    const {events,  DeleteEvents} = this.props;
    return (
      <div>
        {events.map((event) =>(
          <EventListItem 
            key={event.id} 
            event={event} 
            DeleteEvents={DeleteEvents}
        />
        ))}
        
      </div>
    )
  }
}

export default EventList
