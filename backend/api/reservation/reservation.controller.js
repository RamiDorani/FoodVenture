const reservationService = require('./reservation.service')
const logger = require('../../services/logger.service')

module.exports = {
  getReservation,
  getReservations,
  deleteReservation,
  updateReservation,
  addReservation
}

async function getReservation(req, res) {
  const reservation = await reservationService.getById(req.params.id)
  res.send(reservation)
}

// async function getReservations(req, res) {
//   const filterBy = req.query;
//   if (filterBy.isInStock === 'true') filterBy.isInStock = true;
//   if (filterBy.isInStock === 'false') filterBy.isInStock = false;

//   const reservations = await reservationService.query(filterBy)
//   logger.debug(reservations);
//   res.send(reservations)
// }

async function getReservations(req, res) {
  const reservations = await reservationService.query(req.query)
  logger.debug(reservations);
  res.send(reservations)
}

async function deleteReservation(req, res) {
  await reservationService.remove(req.params.id)
  res.end()
}

async function updateReservation(req, res) {
  const reservation = req.body;
  await reservationService.update(reservation)
  res.send(reservation)
}

async function addReservation(req, res) {
  const reservation = req.body;
  await reservationService.add(reservation)
  res.send(reservation)
}