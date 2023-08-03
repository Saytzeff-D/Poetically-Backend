const express = require('express')
const { login, register, verifyEmail, currentUser, profilePicture } = require('../controllers/user.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const { checkEmail } = require('../middlewares/email.middleware')
const { insertReferral } = require('../controllers/referral.controller')
const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/validateEmail', checkEmail, insertReferral)
userRouter.post('/register', register)
userRouter.post('/verifyEmail', verifyEmail)
userRouter.get('/currentUser', authJWT, currentUser )
userRouter.post('/profilePicture', authJWT, profilePicture)

module.exports = userRouter