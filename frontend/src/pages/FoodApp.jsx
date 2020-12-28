import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Cuisines } from '../cmps/Cuisines'
import { Header } from '../cmps/Header'
import { Locations } from '../cmps/Locations'
import { Link } from 'react-router-dom'
import { UserList } from '../cmps/UserList'
import { loadUsers, login } from '../store/actions/userActions'
import { TestimonialsOne } from '../cmps/TestimonialsOne'
import { TestimonialsTwo } from '../cmps/TestimonialsTwo'

class _FoodApp extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.loadUsers()
    if(!this.props.loggedInUser)this.guestMode()
  }

  getBestChefs() {
    const users = this.props.users
    const onlyChefs = users.filter(user => user.chef)
    const sortedUsers = onlyChefs.sort((b, a) => {
      return a.chef['rating'] < b.chef['rating'] ? -1 : a.chef['rating'] < b.chef['rating'] ? 1 : 0;
    })
    return sortedUsers.slice(0, 4)
  }

  guestMode = () => {
    console.log('guest mode controll center :');
    const userCreds = { userName: "guest", password: "guest" };
    this.props.login(userCreds);
  }

  render() {

    const usersToShow = this.getBestChefs()
    if (!usersToShow) return <div>Loading...</div>

    return (
      <div className="app main-container app-container">

        <Header />

        <div className="app-chef-sect">
          <div className="flex-between" style={{ paddingBottom: '10px' }}>
            <h3>Our TOP Chefs</h3>
            <Link to='/chef'>
              <p className="see-all-chefs">See All &nbsp;&nbsp;&nbsp;<i className="arrow fas fa-arrow-right"></i></p>
            </Link>
          </div>
          <UserList users={usersToShow} />
        </div>

        <TestimonialsOne />

        <div className="app-locs-sect">
          <h3>Our Locations</h3>
          <Locations />
        </div>

        <TestimonialsTwo />

        <div className="app-cuis-sect">
          <h3>Our Cuisines</h3>
          <Cuisines />
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userReducer.loggedInUser,
    users: state.userReducer.users
  }
}

const mapDispatchToProps = {
  login,
  loadUsers
}

export const FoodApp = connect(mapStateToProps, mapDispatchToProps)(_FoodApp)