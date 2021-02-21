const helpers = require('../helpers/helpers')
const { insertTodos, getTodosComplete, getTodosUncomplete, updateTodos, deleteTodos } = require('../models/todos');
const todos = {
    getTodosComplete: (req, res) => {
        const id = req.params.id
        getTodosComplete(id)
        .then(result => {
        const resultTodos = result
        if (resultTodos.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, resultTodos, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  getTodosUncomplete: (req, res) => {
    const id = req.params.id
    const labelid = req.params.labelid
    console.log(id)
    console.log('heihei')
    getTodosUncomplete(id, labelid)
    .then(result => {
    const resultTodos = result
    if (resultTodos.length === 0) {
      return helpers.response(res, [], 200, null)
    }
    helpers.response(res, resultTodos, 200, null)
  })
  .catch((err) => {
    return helpers.response(res, null, 500, { message: 'problem with database' })
  })
},
  insertTodos: (req, res) => {
    const {user_id, label_id} = req.params
    const { task } = req.body
    const data = { 
      user_id,
      label_id,
      task, 
      completed: 0,
      created_at: new Date(),
      updated_at: new Date() 
    }
    insertTodos(data)
      .then(result => {
        const resultTodos = result
        helpers.response(res, { message: 'Sukses' }, 201, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
    deleteTodos: (req, res) => {
    const id = req.params.id
    deleteTodos(id)
      .then(result => {
        const resultTodos = result
        if (resultTodos.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Sukses' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  updateTodos: (req, res) => {
    const id = req.params.id
    const { task } = req.body
    const data = { 
        task,
        updated_at: new Date()  
    }
    updateTodos( id,data ) 
      .then(result => {
        const resultTodos = result
        if (resultTodos.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Updated' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  updateCompleted: (req, res) => {
    const id = req.params.id
    const data = { 
      completed: 1,
      updated_at: new Date() 
     }
    updateTodos( id,data ) 
      .then(result => {
        const resultTodos = result
        if (resultTodos.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Completed' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
}

module.exports = todos
