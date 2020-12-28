import React from 'react'

export function ReviewPreview({ review }) {

  const firstNameLetter = review.name.slice(0, 1).toUpperCase()

  return (
    <div className="user-review">
      <div className="flex">
        <h2 className="user-tag">{firstNameLetter}</h2>
        <div className="flex">
          <h3 className="user-name">{review.name}</h3>
          <p className="user-rating"><i className="fas fa-star"></i> &nbsp; {review.rating}</p>
        </div>
      </div>
      <p className="user-text">{review.text}</p>
    </div>
  )
}