import React from 'react';
import './eventItem.css';


const eventItem = props => (
    <li key={props._id} className="events__list-item">
        <div>
            <h1>{props.title}</h1>
            <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? (<p>Your are the owner</p>
            ) : ( props.isAdmin === true ? (<p>Admin don`t allow check details</p>) : (<button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>View Details</button>)
            
            )}
        </div>
        </li>
);

export default eventItem;