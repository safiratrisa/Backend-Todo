const express = require('express')
const router = express.Router()
const { getUserbyId, registerUser, loginUser, updateConfirmed, updateUsername, updatePassword, deleteUser, getUnconfirmedUser, getConfirmedUser } = require('../controllers/users')
const { accountVerification } = require('../middlewares/verification')
const { verifyAccess } = require('../middlewares/auth')

router
  .post('/register',registerUser)
  .post('/login', loginUser, accountVerification)
  .get('/confirmed', verifyAccess,getConfirmedUser)
  .get('/unconfirmed', verifyAccess, getUnconfirmedUser)
  .get('/:id', verifyAccess, getUserbyId)
  .put('/confirmed/:id', verifyAccess, updateConfirmed)
  .put('/username/:id', verifyAccess, updateUsername)
  .put('/password/:id', verifyAccess, updatePassword)
  .delete('/:id', verifyAccess, deleteUser)

module.exports = router
