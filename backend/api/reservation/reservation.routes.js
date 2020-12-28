const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getReservation, getReservations, deleteReservation, updateReservation,addReservation } = require('./reservation.controller')
const router = express.Router()

// router.get('/', getReservations)
router.get('/', getReservations)
router.get('/:id', getReservation)
router.put('/:id', updateReservation)
router.post('/', addReservation)
router.delete('/:id', deleteReservation)

// router.get('/', getReservations)
// router.get('/', requireAuth, getReservations)
// router.get('/:id', requireAuth, getReservation)
// router.put('/:id', requireAdmin, updateReservation)
// router.post('/', requireAdmin, addReservation)
// router.delete('/:id', requireAdmin, deleteReservation)

module.exports = router