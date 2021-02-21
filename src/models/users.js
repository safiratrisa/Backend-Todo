const connection = require('../configs/db')

const users = {
  checkUser: (username) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE username = ?', username, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getConfirmedUser: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.id, users.username FROM users WHERE confirmed = 1', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getUnconfirmedUser: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.id, users.username FROM users WHERE confirmed = 0', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getUserbyId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.id, users.username, users.role FROM users WHERE users.id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  insertUsers: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
            console.log('kebaca')
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = users
