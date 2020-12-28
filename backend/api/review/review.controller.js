const logger = require('../../services/logger.service')
const reviewService = require('./review.service')
const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
const ObjectId = require('mongodb').ObjectId



async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete review' })
    }
}

async function addReview(req, res) {
    var review = req.body;
    const collection = await dbService.getCollection('user');
    const user = await collection.findOne({ "_id": ObjectId(review.chefId) })
    const chefReviews = user.chef.reviews
    const newReviewToInsert = {
        _id : review._id,
        text : review.txt,
        rating : review.stars,
        name : review.userReviewName
    }
    chefReviews.unshift(newReviewToInsert)
    const updatedUser = await userService.update(user)
    res.send(updatedUser)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}