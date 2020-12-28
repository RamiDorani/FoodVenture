const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    getByUserName
}

async function getByUserName(userName) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ userName })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userName}`)
        throw err;
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        return _sortUsers(users, filterBy.sortBy)
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

function _sortUsers(users, sortBy) {
    const onlyChefs = users.filter(user => user.chef)
    if (!sortBy) return onlyChefs
    else if (sortBy === 'price') {
        return onlyChefs.sort((a, b) => {
            return a.chef[sortBy] < b.chef[sortBy] ? -1 : a.chef[sortBy] < b.chef[sortBy] ? 1 : 0;
        })
    }
    else if (sortBy === 'rating') {
        return onlyChefs.sort((a, b) => {
            return a.chef[sortBy] > b.chef[sortBy] ? -1 : a.chef[sortBy] < b.chef[sortBy] ? 1 : 0;
        })
    }
    return onlyChefs.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
    })
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({
            "_id": ObjectId(userId)
        })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({
            "_id": ObjectId(userId)
        })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    try {
        await collection.replaceOne({
            "_id": user._id
        }, user)
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        console.log('after added user :' , user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.fullName) {
        criteria.fullName = new RegExp(filterBy.fullName, 'ig');
    }
    return criteria;
}