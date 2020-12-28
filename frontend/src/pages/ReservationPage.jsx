import React, { Component } from "react";
import { connect } from "react-redux";
import { loadReservations, removeReservation, saveReservation } from "../store/actions/reservationActions";
import { reservationService } from '../services/reservationService'
// import {userService} from '../services/userService'
import { Chat } from "./Chat";
import { Modal } from "../cmps/Modal";
import { eventBus } from "../services/event-bus-service";
import socketService from '../services/socketService';


class _ReservationPage extends Component {

  state = {
    isEditing: false,
    reservationId: '',
    isChatOpen: false,
    isNotification: false
  }

  componentDidMount() {
    this.props.loadReservations();
    eventBus.on('edited', () => {
      this.setState({ isEditing: false })
    })
    socketService.setup();
    socketService.on('msg sent', () => {
      this.addChatNotification()
    });
  }

  componentWillUnmount() {
    eventBus.emit('edited')
    this.setState({ isChatOpen: false })
    this.setState({ isNotification: false })
  }

  toggleChat = () => {
    this.setState({ isChatOpen: !this.state.isChatOpen })
    this.setState({ isNotification: false })
  }

  addChatNotification = () => {
    if (this.state.isChatOpen) {
      console.log('returning');
      return
    }
    console.log('msg sent');
    this.setState({ isNotification: true },console.log('test'))
    //this.setState({ isNotification: true },console.log('test'))
    console.log(this.state.isChatOpen);
  }

  onDelete = (reservationId) => {
    this.props.removeReservation(reservationId);
  }

  onAccept = async (reservationId) => {
    const reservation = await reservationService.getById(reservationId);
    reservation.status = 'Accepted'
    this.props.saveReservation(reservation);
  }

  onDecline = async (reservationId) => {
    const reservation = await reservationService.getById(reservationId);
    reservation.status = 'Declined'
    this.props.saveReservation(reservation);
  }

  openEdit = (reservationId) => {
    this.setState({ reservationId })
    this.setState({ isEditing: true })
  }

  getReservationByUser = (reservations) => {
    let filteredRes;
    if (!this.props.loggedInUser.chef) {
      filteredRes = reservations.filter(reservation =>
        reservation.by.userId === this.props.loggedInUser._id
      )
      filteredRes.reverse();
    } else {
      filteredRes = reservations.filter(reservation =>
        reservation.from.userId === this.props.loggedInUser._id
      )
      filteredRes.reverse();
    }
    return filteredRes
  }

  toggleNotification = flag =>{
    this.setState({isNotification:flag})
  }

  render() {

    const { reservations } = this.props;
    const filteredReservations = this.getReservationByUser(reservations)
    if (!filteredReservations) return <div className="main-container"><img src={require('../img/loading.gif')} className="loading" alt="" /></div>

    return (

      <div className="reservations-list main-container">
        <h2 className="reservations-list-header" style={{ textTransform: 'capitalize' }}>Welcome {this.props.loggedInUser.fullName}, below is a list of your reservations</h2>
        <div className="reservations">
          {
            filteredReservations.map(reservation =>
              <div className="reservation-card" key={reservation._id}>
                <h3 style={{ textTransform: 'capitalize' }}>Name Of The Customer : {reservation.by.fullName}</h3>
                <p>Number of guests : {reservation.guestsCount}</p>
                <p>Meal Location : {reservation.placeLocation}</p>
                <p>Customer Adress : {reservation.adress}</p>
                <p>Date : {reservation.date}</p>
                <p>Time : {reservation.time}</p>
                {!this.props.loggedInUser.chef && <p>Chef Name : {reservation.from.chefName}</p>}
                <p>Comments : {reservation.comments}</p>
                <p>Status : {reservation.status}</p>
                <p>Total Price : ${reservation.totalPrice}</p>

                {this.props.loggedInUser.chef && <button className="accept" onClick={() => {
                  this.onAccept(reservation._id)
                }}>ACCEPT</button>}

                {this.props.loggedInUser.chef && <button className="decline" onClick={() => {
                  this.onDecline(reservation._id)
                }}>DECLINE</button>}

                <button className="edit" onClick={() => {
                  this.openEdit(reservation._id)
                }}>EDIT</button>

                {!this.props.loggedInUser.chef && <button className="delete" onClick={() => {
                  this.onDelete(reservation._id)
                }}>CANCEL</button>}

              </div>
            )
          }
        </div>

        {this.state.isEditing && <Modal reservationId={this.state.reservationId} />}

        {this.state.isChatOpen && <Chat toggleNotification={this.toggleNotification} isNotification={this.state.isNotification} chef={this.props.loggedInUser.fullName} />}

        {this.props.loggedInUser.chef && <div className="chat-btn-container">
          <button className={`chat-btn ${this.state.isNotification ? 'notification' : ''}`} onClick={this.toggleChat}><i className="far fa-comments"></i></button>
        </div>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reservations: state.reservationReducer.reservations,
    loggedInUser: state.userReducer.loggedInUser
  };
};

const mapDispatchToProps = {
  loadReservations,
  removeReservation,
  saveReservation
};

export const ReservationPage = connect(mapStateToProps, mapDispatchToProps)(_ReservationPage);