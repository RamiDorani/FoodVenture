import React from 'react'
import { UserPreview } from './UserPreview'

export function UserList({ users }) {

  const onlyChefs = users.filter(user => user.chef)

  return (
    <div className="user-list card-grid">
      {
        onlyChefs.map(user => <UserPreview key={user._id} user={user} />)
      }
    </div>
  )
}