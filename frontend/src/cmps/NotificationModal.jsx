import React from 'react'
import { Link } from 'react-router-dom'

export function NotificationModal({ closeModal }) {
    return (
        <div className="notification-modal-wrapper">
            <div className="notification-modal-content">
                <h3>You have a new reservation!</h3>
                <Link to='/reservations' className="link" onClick={closeModal}>Go To Reservations</Link>
                <button className="close-notification-modal-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}
