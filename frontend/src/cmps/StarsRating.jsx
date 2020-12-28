import React from 'react'

export function StarsRating({ ratingChanged }) {
  return (
    <div className="rating">
      <input id="rating-5" type="radio" name="rating" value="5" /><label htmlFor="rating-5"><i className="fas fa-star" onClick={() => ratingChanged(5)}></i></label>
      <input id="rating-4" type="radio" name="rating" value="4" /><label htmlFor="rating-4"><i className="fas fa-star" onClick={() => ratingChanged(4)}></i></label>
      <input id="rating-3" type="radio" name="rating" value="3" /><label htmlFor="rating-3"><i className="fas fa-star" onClick={() => ratingChanged(3)}></i></label>
      <input id="rating-2" type="radio" name="rating" value="2" /><label htmlFor="rating-2"><i className="fas fa-star" onClick={() => ratingChanged(2)}></i></label>
      <input id="rating-1" type="radio" name="rating" value="1" /><label htmlFor="rating-1"><i className="fas fa-star" onClick={() => ratingChanged(1)}></i></label>
    </div>
  )
}
