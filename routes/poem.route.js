const express = require('express')
const { uploadPoem, myPoems } = require('../controllers/poem.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const PoemRouter = express.Router()

PoemRouter.post('/upload', authJWT, uploadPoem)
PoemRouter.get('/my-poems', authJWT, myPoems)

module.exports = PoemRouter