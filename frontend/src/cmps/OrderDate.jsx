import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'

import { setReservationDate } from '../store/actions/reservationActions'

class _OrderDate extends Component {

  state = {
    date: new Date(),
  }

  onChange = (date) => {
    this.setState({ date })
    this.props.setReservationDate(date)
  }

  getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomDate() {
    let nums = this.getDate()
    let day = +nums[1]
    let month = +nums[0]
    let year = +nums[2]

    let newMonth = month + this.getRandomNum(-1, 2)
    if (newMonth > 12) {
      newMonth -= 12
      year++
    }

    let newDay = day + this.getRandomNum(1, 29)
    if (newDay > 30) {
      newDay -= 30
      newMonth++
    }

    return new Date(year, newMonth, newDay)
  }

  getRandomDates(num) {
    let dates = []
    for (let i = 0; i < num; i++) {
      dates.push(this.getRandomDate())
    }
    return dates;
  }

  disabledDates = this.getRandomDates(50)

  // disabledDates = [
  //   new Date(2020, 8, 26),
  //   new Date(2020, 8, 27),
  //   new Date(2020, 8, 30),
  //   new Date(2020, 9, 5),
  //   new Date(2020, 9, 9),
  //   new Date(2020, 9, 11),
  //   new Date(2020, 9, 13),
  //   new Date(2020, 9, 19),
  //   new Date(2020, 9, 25),
  //   new Date(2020, 10, 3),
  // ];

  formatDate(time) {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en', options).format(time);
  }

  getDate() {
    const date = Date.now()
    return this.formatDate(date).split('/');
  }

  render() {

    return (
      <div className="calendar-container">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          locale={"en-US"}
          minDate={(new Date())}

          tileDisabled={({ date, view }) =>
            (view === 'month') && // Block day tiles only
            this.disabledDates.some(disabledDate =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
            )}

        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setReservationDate,
}

export const OrderDate = connect(null, mapDispatchToProps)(_OrderDate);