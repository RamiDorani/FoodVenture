import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

export class Filter extends Component {

  state = {
    fullName: '',
    sortBy: ''
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState({ [field]: value }, () => this.props.onSetFilter(this.state))
  }

  sortByName = () => {
    this.setState({ sortBy: 'fullName' }, () => this.props.onSetFilter(this.state))
  }

  sortByPrice = () => {
    this.setState({ sortBy: 'price' }, () => this.props.onSetFilter(this.state))
  }

  sortByRating = () => {
    this.setState({ sortBy: 'rating' }, () => this.props.onSetFilter(this.state))
  }

  render() {

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
      <section className="filter">
        <MuiThemeProvider theme={theme}>
          <TextField type="text" name="fullName" label="Search chef by name" onChange={this.handleChange} noValidate autoComplete="off" />
        </MuiThemeProvider>
        <div className="filter-sort">Sort by <span onClick={this.sortByName}>Name</span> | <span onClick={this.sortByPrice}>Price</span> | <span onClick={this.sortByRating}>Rating</span></div>
      </section>
    )
  }
}