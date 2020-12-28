const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser,addUser } = require('./user.controller')
const router = express.Router()

// router.get('/', getUsers)
router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.post('/', addUser)
router.delete('/:id', deleteUser)

// router.get('/', getUsers)
// router.get('/', requireAuth, getUsers)
// router.get('/:id', requireAuth, getUser)
// router.put('/:id', requireAdmin, updateUser)
// router.post('/', requireAdmin, addUser)
// router.delete('/:id', requireAdmin, deleteUser)

module.exports = router