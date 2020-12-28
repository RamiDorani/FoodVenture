import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, MenuItem, Select, InputLabel } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { reservationService } from '../services/reservationService'
import { saveReservation } from '../store/actions/reservationActions'
import { withRouter } from 'react-router-dom'
import { userService } from '../services/userService'
import { eventBus } from '../services/event-bus-service';
import socketService from '../services/socketService';

class _ReservationForm extends React.Component {

  state = {
    reservation: {
      by: '',
      from: '',
      status: 'Pending',
      date: '',
      time: '',
      adress: '',
      guestsCount: 1,
      comments: '',
      totalPrice: this.props.chefPrice,
      createdAt: Date.now(),
      chefPrice: this.props.chefPrice
    }
  }

  async componentDidMount() {

    const { reservationId } = this.props

    if (reservationId) {
      const reservation = await reservationService.getById(reservationId)
      this.setState({ reservation })
    }

    const { userId } = this.props.match.params;
    const user = await userService.getById(userId);
    const chefName = user.fullName;
    this.setState({ reservation: { ...this.state.reservation, from: { userId, chefName } } });

    const { loggedInUser } = this.props
    this.setState({ reservation: { ...this.state.reservation, by: { userId: loggedInUser._id, fullName: loggedInUser.fullName } } });


    const date = this.props.date || Date.now()
    const resDate = this.formatDate(date)
    this.setState({ reservation: { ...this.state.reservation, date: resDate } });
  }

  onInputChange = (ev) => {
    if (ev.target.name === 'placeLocation' && ev.target.value === 'home') document.querySelector('#locationAdress').disabled = false;

    if (ev.target.name === 'placeLocation' && ev.target.value === 'chef-Place') {
      document.querySelector('#locationAdress').value = '';
      document.querySelector('#locationAdress').disabled = true;
    }

    // let value = ev.target.type === 'number' ? +ev.target.value : ev.target.value

    let value

    if (ev.target.type === 'number') {
      value = +ev.target.value
      let total = (value * this.state.reservation.chefPrice)
      this.setState({ reservation: { ...this.state.reservation, totalPrice: total, [ev.target.name]: value } })
    }
    else {
      value = ev.target.value
      this.setState({ reservation: { ...this.state.reservation, [ev.target.name]: value } })
    }
  }

  onAddReservation = async (ev) => {
    ev.preventDefault();
    eventBus.emit('closeModal')
    console.log(this.state.reservation);
    await this.props.saveReservation(this.state.reservation);
    socketService.setup();
    socketService.emit('new_reservation', this.state.reservation);
    this.props.history.push('/reservations')
  }

  formatDate = (time) => {
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en', options).format(time);
  }

  render() {

    const date = this.props.date || Date.now()
    const resDate = this.formatDate(date)
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#1dbf73'
        },
        text: {
          primary: "#000000",
          secondary: "#b2b2b2"
        }
      },
      typography: {
        fontFamily: 'montserrat'
      }
    });

    return (

      <form className="reservation-form" noValidate autoComplete="off">

        <h3>Reservation details</h3>

        <MuiThemeProvider theme={theme}>

          <div>
            <TextField id="name-field" label="Please Enter Your Name" InputLabelProps={{ shrink: true }} required type="text" value={this.state.reservation.by.fullName} name="by" placeholder="John Doe" variant="outlined" onChange={this.onInputChange} />
          </div>

          <div>
            <TextField id="guestsCount" required InputProps={{ inputProps: { min: 1, max: 12 } }} name="guestsCount" value={this.state.reservation.guestsCount} type="number" label="Number of guests" variant="outlined" onChange={this.onInputChange} />
          </div>

          <div>
            <TextField label="Reservation Date" InputLabelProps={{ shrink: true }} id="outlined-basic" required type="text" value={`${resDate}`} variant="outlined" disabled />
          </div>

          <div>
            <TextField label="Reservation Time" InputLabelProps={{ shrink: true }} id="datetime-local" required name="time" value={this.state.reservation.time} type="time" variant="outlined" onChange={this.onInputChange} />
          </div>

          <div className="select">
            <InputLabel id="select">Where To Dine ?</InputLabel>
            <Select id="select" required name="placeLocation" label="Where To Dine ?" onChange={this.onInputChange} MenuProps={{ disableScrollLock: true }}>
              <MenuItem value="Home">Customer's Place</MenuItem>
              <MenuItem value="Chef's-Place">Chef's Place</MenuItem>
            </Select>
          </div>

          <div>
            <TextField id="locationAdress" value={this.state.reservation.adress} name="adress" label="Adress" variant="outlined" disabled onChange={this.onInputChange} />
          </div>

          <div>
            <TextField aria-label="minimum height" name="comments" value={this.state.reservation.comments} variant="outlined" placeholder="Comments" onChange={this.onInputChange} multiline rows={3} />
          </div>

        </MuiThemeProvider>

        <h2>Total Price : ${this.state.reservation.totalPrice}</h2>

        <button onClick={this.onAddReservation}>Save Reservation</button>

        <Link to="/chef"><button className={"back-btn"}>Go to chef list</button></Link>

      </form>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.reservationReducer.date,
    loggedInUser: state.userReducer.loggedInUser
  }
}

const mapDispatchToProps = {
  saveReservation,
}

export const ReservationForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(_ReservationForm))