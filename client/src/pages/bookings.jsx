import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/spinner/spinner';
import BookingList from '../components/bookings/bookingLIst/bookingList';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    userBookedId: null,
    isMy:false,
    bookings: []
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             user{
               _id
               email
             }
             event {
               _id
               title
               date
             }
            }
          }
        `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data);
          const bookings = resData.data.bookings;
          this.setState({ bookings: bookings, isLoading: false ,isMy:true});
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };


  ///DELETE BOOKING
  deleteBookingHandler = bookingId => {
    this.setState({ isLoading: true });

    const requestBody = {
      query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}"){
              _id
              title
            }
          }
        `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data);

          this.setState(prevState => {
            const updatedBookings = prevState.bookings.filter(booking =>{
              return booking._id !== bookingId;
            });
            return { bookings:updatedBookings,isLoading:false}
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler}/>
        )}
      </React.Fragment>
    );
  }
}

export default BookingsPage;