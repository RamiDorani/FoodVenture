import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import socketService from '../services/socketService'
import { connect } from 'react-redux'

import { NotificationModal } from '../cmps/NotificationModal'

class _NavBar extends Component {

  state = {
    isTop: true,
    isShow: false
  };

  componentDidMount() {
    socketService.setup();
    socketService.on('show_notification', data => {
      console.log(data.message, data.chefId);
      if (this.props.loggedInUser.chef && this.props.loggedInUser._id === data.chefId) {
        this.setState({ isShow: true })
      }
    })
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }
  


  toggleMenu() {
    document.body.classList.toggle('menu-open')
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  render() {
    console.log(this.props);
    return (
      <nav className={"nav-bar flex" + (this.state.isTop ? ' top' : '')}>
        {this.state.isShow &&this.props.location.pathname!=='/reservations'&& <NotificationModal closeModal={this.closeModal} />}


        {/* <div className='screen' onClick={toggleMenu}></div> */}

        <Link to='/'><img src={require('../img/logo.png')} alt="logo" /></Link>

        {/* <i className='hamburger fas fa-bars' onClick={toggleMenu}></i>
      <i className='x fas fa-times' onClick={toggleMenu}></i> */}

        <ul className="flex">
          <NavLink to='/chef' onClick={this.toggleMenu}><li>CHEFS</li></NavLink>
          {/* <NavLink to='/chef' onClick={this.toggleMenu}><li>LOCATIONS</li></NavLink> */}
          <a href="#locations">LOCATIONS</a>
          <a href="#cuisines">CUISINES</a>
          {/* <NavLink to='/chef' onClick={this.toggleMenu}><li>CUISINES</li></NavLink> */}
          <NavLink to='/reservations' onClick={this.toggleMenu}><li>MY RESERVATIONS</li></NavLink>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userReducer.loggedInUser
  }
}



export const NavBar = withRouter(connect(mapStateToProps)(_NavBar))
