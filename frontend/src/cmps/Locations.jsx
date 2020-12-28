import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setFilter } from '../store/actions/userActions'
import { userService } from '../services/userService'
import { LocationCard } from './LocationCard'

class _Locations extends Component {

  state = {
    locations: null
  }

  componentDidMount() {
    this.setState({ locations: userService.getLocations() })
  }

  getLocation = (locationName) => {
    this.props.setFilter({location: locationName})
    this.props.history.push('/chef')
  }

  render() {

    const { locations } = this.state
    if (!locations) return <div>Loading...</div>

    return (
      <div id='locations' className="locations card-grid">
        {
          locations.map(location => <LocationCard key={location._id} location={location} getLocation={this.getLocation} />)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = {
  setFilter
}

export const Locations = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Locations))