import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setFilter } from '../store/actions/userActions'
import { userService } from '../services/userService'
import { CuisineCard } from './CuisineCard'

class _Cuisines extends Component {

  state = {
    cuisines: null
  }

  componentDidMount() {
    this.setState({ cuisines: userService.getCuisines() })
  }

  getCuisine = (cuisineName) => {
    this.props.setFilter({ cuisine: cuisineName })
    this.props.history.push('/chef')
  }

  render() {

    const { cuisines } = this.state
    if (!cuisines) return <div>Loading...</div>

    return (
      <div id='cuisines' className="cuisines card-grid">
        {
          cuisines.map(cuisine => <CuisineCard key={cuisine._id} cuisine={cuisine} getCuisine={this.getCuisine} />)
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

export const Cuisines = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Cuisines))