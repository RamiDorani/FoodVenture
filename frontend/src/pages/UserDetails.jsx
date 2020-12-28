import React, { Component } from "react";
import { eventBus } from '../services/event-bus-service'
import { ChefGallery } from "../cmps/ChefGallery";
import { userService } from "../services/userService";
import { OrderDate } from "../cmps/OrderDate";
import { Map } from "../cmps/Map";
import { ReviewList } from "../cmps/ReviewsList";
import { ChefHighlights } from "../cmps/ChefHighlights";
import { Modal } from "../cmps/Modal";
import { Clap } from "../cmps/Clap";
import { AddReview } from '../cmps/AddReview'
import { Chat } from "./Chat";
import { connect } from 'react-redux'

class _UserDetails extends Component {

  state = {
    user: null,
    chefId: '',
    isFavorite: false,
    isShow: false,
    isReserving: false,
    addedReview: false,
    isChatOpen: false
  };

  async componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ chefId: userId })
    const user = await userService.getById(userId);
    this.setState({ user });
    eventBus.on('reserved', () => {
      this.setState({ isReserving: false })
    })
  }

  componentWillUnmount() {
    eventBus.emit('reserved')
    this.setState({ isChatOpen: false })
  }

  openReserve = () => {
    this.setState({ isReserving: true })
  }

  addToFav = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  }

  openModal = () => {
    this.setState({ isShow: true })
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addedReview = async () => {
    window.location.reload(false);
  }

  toggleChat = () => {
    this.setState({ isChatOpen: !this.state.isChatOpen })
  }

  render() {

    const { user } = this.state;
    if (!user) return <div className="main-container"><img src={require('../img/loading.gif')} className="loading" alt="" /></div>

    const { isReserving } = this.state

    return (
      <div className="user-details main-container" style={{ paddingTop: "70px" }}>

        {isReserving && <Modal chefPrice={user.chef.price} />}

        <section className="chef-gal-details">

          <div className="chef-details-min">

            <div className="clap-clap">
              <Clap />
            </div>

            <div className="flex">
              <div>
                <img src={`${user.imgUrl}`} alt="" className="icon-big" />
              </div>
              <div style={{ marginLeft: '20px' }}>
                <div className="name-looking">
                  <h3 style={{ textTransform: 'capitalize', fontSize: '20px' }}>Chef {user.fullName}</h3>
                  <div className="people-looking">{this.getRandomIntInclusive(2, 19)} people are also looking at this chef, don't miss your chance</div>
                </div>
                <p>{user.chef.rating >= 4.5 ? 'Highly rated' : 'Good offer'}</p>
                <p style={{ padding: '20px 0px' }}>{user.chef.description}</p>
                <div >
                  {user.chef.tags.map((tag, idx) => <p className="chef-details-tag" key={idx}>{tag}</p>)}
                </div>
                <p className="chef-details-location"><i className="fas fa-map-pin" style={{ color: '#b5b6ba' }}></i> {user.chef.location.name}</p>
                <p style={{ color: '#ffbf00', paddingBottom: '20px' }}><i className="fas fa-star"></i> {user.chef.rating.toFixed(1)} <span style={{ color: '#b5b6ba' }}>({user.chef.ratingNum})</span></p>
                <div className="flex-between" style={{ borderTop: '1px solid #b5b6ba', padding: '20px 0' }}>
                  <i className={"fav-heart fas fa-heart flex-center" + (this.state.isFavorite ? ' favorite' : '')} onClick={this.addToFav}></i>
                  <p>Starting from ${user.chef.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="calender-book">
            <OrderDate />
            <div className="book-link">
              <button onClick={this.openReserve}>BOOK NOW</button>
            </div>
          </div>

        </section>

        <section className="chef-details-cal">

          <ChefGallery user={user} />

        </section>

        <section className="details">
          <div className="details-about">
            <h3 className="details-about-chef">About {user.fullName}</h3>
            <p>
              {user.chef.about}
            </p>
          </div>

          <ChefHighlights />

        </section>

        <div className="user-details-map"><Map coord={user.chef.location} /></div>

        <section className="reviews">
          <ReviewList reviews={user.chef.reviews} />
          <AddReview chefId={user._id} addedReview={this.addedReview} />
        </section>

        {this.state.isChatOpen && <Chat chef={user.fullName} />}

        {!this.props.user.chef && <div className="chat-btn-container">
          <button className="chat-btn" onClick={this.toggleChat}><i className="far fa-comments"></i></button>
        </div>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.loggedInUser
  }
}

export const UserDetails = connect(mapStateToProps)(_UserDetails)