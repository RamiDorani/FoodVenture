import { eventBus } from '../services/event-bus-service'

import React from "react";

import { ReservationForm } from '../cmps/ReservationForm'

export class Modal extends React.Component {
  state = {
    isShown: true
  }

  componentDidMount() {
    eventBus.on('closeModal', () => {
      this.setState({ isShown: false })
    })
  }

  closeModal = () => {
    this.setState({ isShown: false })
    eventBus.emit('reserved')
    eventBus.emit('edited')
  }

  render() {

    const { isShown } = this.state

    return (
      <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
        <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
          <span className="close-modal-btn" onClick={this.closeModal}>&times;</span>
          <ReservationForm reservationId={this.props.reservationId} chefPrice={this.props.chefPrice}/>
        </div>
      </div>
    )
  }
}