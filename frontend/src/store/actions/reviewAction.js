import { reviewService } from "../../services/reviewService"


export function loadReviews(id, chef = true) {
  var filterId = {};
  if (id) filterId = id;
  return async dispatch => {
    try {
      const reviews = await reviewService.query(filterId, chef);
      dispatch({ type: 'SET_REVIEWS', reviews });

    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err);
    }
  };
}

export function addReview(newReview) {
  return async dispatch => {
    const updatedUser = await reviewService.add(newReview);
    console.log(updatedUser);
    dispatch({ type: 'ADD_REVIEW', updatedUser })
  }
}

