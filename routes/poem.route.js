const express = require('express')
const { uploadPoem, myPoems, setVisibility, myShop } = require('../controllers/poem.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const PoemRouter = express.Router()

PoemRouter.post('/upload', authJWT, uploadPoem)
PoemRouter.get('/my-poems', authJWT, myPoems)
PoemRouter.put('/setVisibility', authJWT, setVisibility)
PoemRouter.get('/my-shop', authJWT, myShop)

module.exports = PoemRouter