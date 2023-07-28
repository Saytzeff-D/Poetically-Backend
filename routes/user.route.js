const express = require('express')
const { login, register, verifyEmail, currentUser, validateEmail, profilePicture } = require('../controllers/user.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/validateEmail', validateEmail)
userRouter.post('/register', register)
userRouter.post('/verifyEmail', verifyEmail)
userRouter.get('/currentUser', authJWT, currentUser )
userRouter.post('/profilePicture', authJWT, profilePicture)

module.exports = userRouter