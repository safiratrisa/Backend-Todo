const connection = require('../configs/db')

const labels = {
  insertLabels: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO labels SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getLabels: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT labels.id, labels.label, labels.description FROM labels', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateLabels: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE labels SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
            console.log('kebaca')
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteLabels: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM labels WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = labels
