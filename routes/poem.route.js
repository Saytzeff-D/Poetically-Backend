const express = require('express')
const { uploadPoem } = require('../controllers/poem.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const PoemRouter = express.Router()

PoemRouter.post('/upload', authJWT, uploadPoem)

module.exports = PoemRouter