const express = require('express')
const { uploadPoem, myPoems, setVisibility, myShop, topPoems } = require('../controllers/poem.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const PoemRouter = express.Router()

PoemRouter.post('/upload', authJWT, uploadPoem)
PoemRouter.get('/my-poems', authJWT, myPoems)
PoemRouter.get('/top-poems', topPoems)

module.exports = PoemRouter