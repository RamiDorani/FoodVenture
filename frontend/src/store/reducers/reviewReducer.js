const initialState = {
    updatedUser: null,
    selectedReview: null
};

export function reviewReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: action.updatedUser
            };
        case 'ADD_REVIEW':
            console.log(action.updatedUser);
            return {
                ...state,
                updatedUser: action.updatedUser
            };
        // case 'REVIEW_UPDATE':
        //     return {
        //         ...state,
        //         updatedUser: state.updatedUser.map(review =>
        //             review._id === action.review._id ? action.review : review
        //         )
        //     };
        default:
            return state;
    }
}
