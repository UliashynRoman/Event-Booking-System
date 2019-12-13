import React from 'react';
import './eventList.css';
import EventItem from './eventItem/evetnItem';

const eventList = props => {
    ///get data and mapp all as li Item 
    const events = props.events.map(event => {
        return (
            <EventItem key={event._id} 
                       eventId={event._id} 
                       title={event.title} 
                       price={event.price}
                       date={event.date}
                       isAdmin={event.creator.isAdmin}
                       userId={props.authUserId}
                       creatorId={event.creator._id} ///fetched from our backend
                       onDetail={props.onViewDetail}
                       />
        );
      });

    return (
        <ul className="event__list">
                {/* Transrom element to jsx and render */}
                    {events}
          </ul>
    )
    
};

export default eventList;