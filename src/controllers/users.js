const helpers = require('../helpers/helpers')
const { getUserbyId, insertUsers,checkUser, updateUser, deleteUser, getUnconfirmedUser, getConfirmedUser } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4 } = require('uuid')


const users = {
    registerUser: (req, res, next) => {
        const { username, password } = req.body
        checkUser(username)
        .then(result => {
            if(result.length>0) {return helpers.response(res, null, 402, { message: 'username is already exist' })}
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    const data = {
                        id: uuidv4(),
                        role: 1,
                        username,
                        password: hash,
                        confirmed: 0,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    insertUsers(data) 
                    .then(result => {
                        console.log('berhasil')
                        const resultUser = result
                        helpers.response(res, { message: 'Sukses' }, 201, null)
                    })
                    .catch((err) => {
                        console.log('gagal')
                        return helpers.response(res, null, 500, { message: 'problem with database' })
                    })
                })
            })
        })
    },
    loginUser: (req, res, next) => {
        const {username, password} = req.body
        checkUser(username)
        .then(result => {
            console.log(result.length)
            if(result.length === 0) {return helpers.response(res, null, 402, { message: 'username tidak terdaftar' })}
            const users = result[0]
            console.log(users)
            bcrypt.compare(password, users.password, function(err, resCheck) {
            if(!resCheck) {return helpers.response(res, null, 401, { message: 'Wrong Password' })}
            delete users.password
            
            const option = {
              expiresIn: '12h'
            }
            
            const payload = {
              userID: users.id,
              roleID: users.role,
              confirmedID: users.confirmed
            }
            
            jwt.sign(payload, process.env.SECRET_KEY, option, function(err, token) {
              users.token = token
              req.users = users
              return next()
            })
          })
        })
        .catch((err) => {
          return helpers.response(res, null, 500, { message: 'problem with database' })
        })
      },
      getConfirmedUser: async(req, res, next) => {
        getConfirmedUser()
          .then(result => {
            const resultUser = result
            if (resultUser.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, resultUser, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      },
      getUnconfirmedUser: async(req, res, next) => {
        getUnconfirmedUser()
          .then(result => {
            const resultUser = result
            if (resultUser.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, resultUser, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      },
      getUserbyId: async(req, res) => {
        const id = req.params.id
        getUserbyId(id)
          .then(result => {
            const resultUser = result
            if (resultUser.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, resultUser, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      },
      updateConfirmed: (req, res) => {
        const id = req.params.id
        const confirmed = 1
        const data = { 
          confirmed,
          updated_at: new Date() 
         }
        updateUser( id,data ) 
          .then(result => {
            const resultUsers = result
            if (resultUsers.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, { message: 'Terverifikasi' }, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      },
      updateUsername: (req, res, next) => {
        const id = req.params.id
        const username = req.body.username
        const data = {
          username,
          updated_at: new Date() 
        }
        updateUser(id,data) 
          .then(result => {
            const resultUsers = result
            if (resultUsers.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, { message: 'Username updated' }, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      },
      updatePassword: (req, res,next) => {
        const id = req.params.id
        const {newPassword} = req.body
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newPassword, salt, function(err, hash) {
            const newPassword = hash
            const data = {
              password: newPassword,
              updated_at: new Date() 
            }
            updateUser(id,data)
            .then((result)=> {
                const resultUsers = result
                if (resultUsers.length === 0) {
                    return helpers.response(res, [], 200, null)
                  }
              return helpers.response(res, { message: 'update password berhasil' }, 200, null)
            })
            .catch((err) => {
              return helpers.response(res, null, 500, { message: 'problem with database' })
            })
          })
        })
      },
      deleteUser: (req, res, next) => {
        const id = req.params.id
        deleteUser(id)
          .then(result => {
            const resultUsers = result
            if (resultUsers.length === 0) {
              return helpers.response(res, [], 200, null)
            }
            helpers.response(res, { message: 'Deleted!' }, 200, null)
          })
          .catch((err) => {
            return helpers.response(res, null, 500, { message: 'problem with database' })
          })
      }
}

module.exports = users
