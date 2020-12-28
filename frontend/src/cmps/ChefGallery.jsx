import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

//change this.props.user.chef.imgUrl to arrray in FV_DB
export class ChefGallery extends Component {

  render() {
    const { user } = this.props
    return (
      <div className="carousel">
        <Carousel swipeable={true} autoPlay infiniteLoop interval={3000} showThumbs={false} transitionTime="500">
          {user.chef.imgs.map(img => <img className="carousel-img" src={img} alt="" key={user._id} />)}
        </Carousel>
      </div>
    );
  }
}