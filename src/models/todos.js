const connection = require('../configs/db')

const todos = {
  insertTodos: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO todos SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getTodosComplete: (id, labelid) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.id AS userid, users.username, labels.id AS labelid, labels.label, todos.id AS todoid, todos.task, todos.completed, todos.created_at, todos.updated_at FROM todos LEFT JOIN users ON users.id = todos.user_id LEFT JOIN labels ON labels.id = todos.label_id WHERE (users.id = ? AND todos.completed = 1) ORDER BY todos.updated_at DESC', [id, labelid], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getTodosUncomplete: (id, labelid) => {
    return new Promise((resolve, reject) => {
        console.log('kebaca')
      connection.query('SELECT users.id AS userid, users.username, labels.id AS labelid, labels.label, todos.id AS todoid, todos.task, todos.completed, todos.created_at FROM todos LEFT JOIN users ON users.id = todos.user_id LEFT JOIN labels ON labels.id = todos.label_id WHERE (users.id = ? AND todos.completed = 0 AND labels.id = ?) ORDER BY todos.created_at ASC', [id,labelid], (error, results) => {
        if (!error) {
            console.log('askebaca')
          resolve(results)
        } else {
            console.log('kdsaebaca')
          reject(error)
        }
      })
    })
  },
  updateTodos: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE todos SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
            console.log('kebaca')
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteTodos: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM todos WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = todos
