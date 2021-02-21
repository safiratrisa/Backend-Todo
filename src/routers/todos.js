const express = require('express')
const router = express.Router()
const { getTodosComplete, getTodosUncomplete, insertTodos, deleteTodos, updateTodos, updateCompleted } = require('../controllers/todos')
const { verifyAccess } = require('../middlewares/auth')
router
  .post('/inserttodo/:user_id/:label_id',verifyAccess,insertTodos)
  .put('/updatetask/:id', verifyAccess, updateTodos)
  .get('/completed/:id', verifyAccess, getTodosComplete)
  .get('/uncompleted/:id/:labelid', verifyAccess, getTodosUncomplete)
  .delete('/:id', verifyAccess, deleteTodos)
  .put('/completing/:id', verifyAccess, updateCompleted)

module.exports = router
