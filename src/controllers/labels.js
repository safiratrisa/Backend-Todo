const helpers = require('../helpers/helpers')
const { insertLabels, getLabels, updateLabels, deleteLabels } = require('../models/labels');
const labels = {
  getLabels: async(req, res) => {
    getLabels()
      .then(result => {
        const resultLabels = result
        if (resultLabels.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, resultLabels, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  insertLabels: (req, res) => {
    const { label, description } = req.body
    const data = { 
      label, 
      description,
      created_at: new Date(),
      updated_at: new Date() 
    }
    insertLabels(data)
      .then(result => {
        const resultLabels = result
        helpers.response(res, { message: 'Sukses' }, 201, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
    deleteLabels: (req, res) => {
    const id = req.params.id
    deleteLabels(id)
      .then(result => {
        const resultLabels = result
        if (resultLabels.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Sukses' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  updateLabel: (req, res) => {
    const id = req.params.id
    const { label } = req.body
    const data = { 
      label, 
      updated_at: new Date() 
    }
    updateLabels( id,data ) 
      .then(result => {
        const resultLabels = result
        if (resultLabels.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Updated' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  },
  updateDesc: (req, res) => {
    const id = req.params.id
    const { description } = req.body
    const data = { 
      description,
      updated_at: new Date() 
     }
    updateLabels( id,data ) 
      .then(result => {
        const resultLabels = result
        if (resultLabels.length === 0) {
          return helpers.response(res, [], 200, null)
        }
        helpers.response(res, { message: 'Updated' }, 200, null)
      })
      .catch((err) => {
        return helpers.response(res, null, 500, { message: 'problem with database' })
      })
  }
}

module.exports = labels
