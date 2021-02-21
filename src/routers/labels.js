const express = require('express')
const router = express.Router()
const { getLabels, insertLabels, deleteLabels, updateLabel, updateDesc } = require('../controllers/labels')
const { verifyAccess } = require('../middlewares/auth')
router
  .post('/insertlabels',verifyAccess,insertLabels)
  .put('/updatelabel/:id',verifyAccess, updateLabel)
  .put('/updatedesc/:id',verifyAccess, updateDesc)
  .get('/all-labels',verifyAccess, getLabels)
  .delete('/:id',verifyAccess, deleteLabels)

module.exports = router
