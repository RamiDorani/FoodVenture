const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('reservation')
    try {
        const reservations = await collection.find(criteria).toArray();
        return _sortReservations(reservations, filterBy.sortBy)

    } catch (err) {
        console.log('ERROR: cannot find reservations')
        throw err;
    }
}

function _sortReservations(reservations, sortBy) {
    if (!sortBy) return reservations
    return reservations.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
    })
}

async function getById(reservationId) {
    const collection = await dbService.getCollection('reservation')
    try {
        const reservation = await collection.findOne({
            "_id": ObjectId(reservationId)
        })
        return reservation
    } catch (err) {
        console.log(`ERROR: while finding reservation ${reservationId}`)
        throw err;
    }
}

async function remove(reservationId) {
    const collection = await dbService.getCollection('reservation')
    try {
        await collection.deleteOne({
            "_id": ObjectId(reservationId)
        })
    } catch (err) {
        console.log(`ERROR: cannot remove reservation ${reservationId}`)
        throw err;
    }
}

async function update(reservation) {
    const collection = await dbService.getCollection('reservation')
    reservation._id = ObjectId(reservation._id);
    try {
        await collection.replaceOne({
            "_id": reservation._id
        }, reservation)
        return reservation
    } catch (err) {
        console.log(`ERROR: cannot update reservation ${reservation._id}`)
        throw err;
    }
}

async function add(reservation) {
    const collection = await dbService.getCollection('reservation')
    try {
        await collection.insertOne(reservation);
        return reservation;
    } catch (err) {
        console.log(`ERROR: cannot insert reservation`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = new RegExp(filterBy.name, 'ig');
    }
    if (filterBy.isInStock === true || filterBy.isInStock === false) {
        criteria.inStock = filterBy.isInStock
    }
    if (filterBy.type) {
        criteria.type = filterBy.type
    }
    return criteria;
}