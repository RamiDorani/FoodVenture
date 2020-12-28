module.exports = {
  query,
  add
}

const msgs = []

function query() {
  return msgs
}

function add(msg) {
  msgs.push(msg)
}