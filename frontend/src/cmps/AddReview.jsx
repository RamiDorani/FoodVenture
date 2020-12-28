import React, { Component } from 'react';
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { addReview } from '../store/actions/reviewAction'
import { StarsRating } from './StarsRating';


class _AddReview extends Component {

    state = {
        reviewToEdit: {
            txt: '',
            stars: 5,
            chefId: this.props.chefId,
        }
    };

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            reviewToEdit: {
                ...prevState.reviewToEdit,
                [name]: value
            }
        }));
    };

    addReview = ev => {
        ev.preventDefault();
        this.props.addReview(this.state.reviewToEdit);
        this.setState({ reviewToEdit: { txt: '', stars: '', chefId: '' } });
        this.props.addedReview()
    }

    ratingChanged = (newRating) => {
        this.setState(prevState => ({
            reviewToEdit: {
                ...prevState.reviewToEdit,
                stars: newRating
            }
        }));
    };

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

            <form className="review-form flex-col" onSubmit={this.addReview}>

                <MuiThemeProvider theme={theme}>
                    <TextField type="text" name="userReviewName" onChange={this.handleChange} placeholder="Your Name" variant="outlined" noValidate autoComplete="off" />

                    <div className="add-review">
                        <TextField aria-label="minimum height" name="txt" value={this.state.reviewToEdit.txt} variant="outlined" placeholder="Add a review" onChange={this.handleChange} multiline rows={5} />
                    </div>
                </MuiThemeProvider>

                <div className="stars">
                    <StarsRating ratingChanged={this.ratingChanged} />
                </div>

                <button>SUBMIT</button>

            </form>
        )

    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.users,
    }
}

const mapDispatchToProps = {
    addReview,
}

export const AddReview = connect(mapStateToProps, mapDispatchToProps)(_AddReview)