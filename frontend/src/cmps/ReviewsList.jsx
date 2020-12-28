import React from 'react'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {
        reviews.map(review => <ReviewPreview key={review._id} review={review} />)
      }
    </div>
  )
}