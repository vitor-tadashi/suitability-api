const message = require('../error/messages')

module.exports = class {
  static get(key) {
    return message[key]
  }
}
