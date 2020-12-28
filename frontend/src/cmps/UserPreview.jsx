import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LongTxt } from './LongText'

export class UserPreview extends Component {

  state = {
    isFavorite: false
  }

  addToFav = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  }

  render() {

    const { user } = this.props
    return (
      <div className="user-preview card" style={{ border: '1px solid #b5b6ba' }}>

        <Link to={`/details/${user._id}`}>

          <img className="user-preview-food" src={`${user.chef.imgs[0]}`} alt="" />

          <div className="user-preview-details flex p10">
            <div>
              <img className="icon" src={`${user.imgUrl}`} alt="" />
            </div>
            <div style={{ marginLeft: '10px' }}>
              <h3 style={{ textTransform: 'capitalize' }}>Chef {user.fullName}</h3>
              <p>{user.chef.rating >= 4.5 ? 'Highly rated' : 'Good offer'}</p>
            </div>
          </div>

          <LongTxt text={user.chef.description} />

          <div className="user-preview-tags-container">
            {user.chef.tags.map((tag, idx) => <p className="user-preview-tag" key={idx}>{tag}</p>)}
          </div>

          <div className="location-rating flex-between">
            <p className="user-preview-location"><i className="fas fa-map-pin"></i> {user.chef.location.name}</p>

            <p className="user-preview-rating"><i className="fas fa-star"></i> {user.chef.rating.toFixed(1)} <span>({user.chef.ratingNum})</span></p>
          </div>

        </Link>

        <div className="flex-between" style={{ borderTop: '1px solid #b5b6ba', padding: '5px 10px' }}>
          <i className={"fav-heart fas fa-heart flex-center" + (this.state.isFavorite ? ' favorite' : '')} onClick={this.addToFav}></i>
          <p className="price">Starting from ${user.chef.price}</p>
        </div>

      </div>
    )
  }
}