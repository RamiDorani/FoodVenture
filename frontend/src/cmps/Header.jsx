import React, { Component } from 'react'

export class Header extends Component {

  scrollDown() {
    let pageHeight = window.innerHeight;
    window.scrollBy(0, pageHeight);
  }

  render() {
    return (
      <section className="header full">
        <div className="text">
          <h2>Hire a Private Chef Across The WORLD</h2>
          <h3>With The Leading Private Chef Service</h3>
        </div>
        <div className="arrow" onClick={this.scrollDown}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    )
  }
}