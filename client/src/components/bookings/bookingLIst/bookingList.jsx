import React from 'react';

import './bookingList.css';

const bookingList = props => (
   
  <ul className="bookings__list">
   
    {props.bookings.length !== 0 ? 
        props.bookings.map(booking => {
      return (
          
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.event.title} -{' '}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
          </div>
        </li>
      );
    }) : <li className="bookings__item">You have no events yet</li> }
    
  </ul>
);

export default bookingList;