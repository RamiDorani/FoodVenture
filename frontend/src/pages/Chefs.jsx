import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadUsers } from '../store/actions/userActions'
import { clearFilter } from '../store/actions/userActions'
import { UserList } from '../cmps/UserList'
import { Filter } from '../cmps/Filter'

class _Chefs extends Component {

  state = {
    filterBy: {}
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.loadUsers()
  }

  componentWillUnmount() {
    this.props.clearFilter()
  }
  

  onSetFilter = (filterBy) => {
    this.setState(prevState => ({ filterBy: { ...prevState.filterBy, ...filterBy } }), () => this.props.loadUsers(this.state.filterBy))
  }

  render() {

    const { users } = this.props
    let onlyChefs = users.filter(user => user.chef)
    
    if (this.props.filter.location) {
      onlyChefs = onlyChefs.filter(user => user.chef.location.name === this.props.filter.location)
    }
    else if (this.props.filter.cuisine) {
      onlyChefs = onlyChefs.filter(user => user.chef.tags.includes(this.props.filter.cuisine))
    }
    
    if (!onlyChefs) return <div className="main-container"><img src={require('../img/loading.gif')} className="loading" alt="" /></div>

    return (
      <div className="main-container">
        <div style={{ paddingBottom: '20px' }}>
          <Filter onSetFilter={this.onSetFilter} />
        </div>
        <UserList users={onlyChefs} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    filter: state.userReducer.filter
  }
}

const mapDispatchToProps = {
  loadUsers,
  clearFilter
}

export const Chefs = connect(mapStateToProps, mapDispatchToProps)(_Chefs)