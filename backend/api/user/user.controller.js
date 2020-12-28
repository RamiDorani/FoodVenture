const userService = require('./user.service')
const logger = require('../../services/logger.service')

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUser
}

async function getUser(req, res) {
  const user = await userService.getById(req.params.id)
  try {
    res.send(user)
  } catch (err) {
    console.log(`ERROR: while finding user ${userId}`)
  }
}

async function getUsers(req, res) {
  const filterBy = req.query;
  const users = await userService.query(filterBy)
  logger.debug(users);
  res.send(users)
}

async function deleteUser(req, res) {
  await userService.remove(req.params.id)
  res.end()
}

async function updateUser(req, res) {
  const user = req.body;
  await userService.update(user)
  res.send(user)
}

async function addUser(req, res) {
  const user = req.body;
  await userService.add(user)
  res.send(user)
}