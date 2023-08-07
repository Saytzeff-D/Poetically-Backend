const express = require('express')
const { authJWT } = require('../middlewares/jwt.middleware')
const { myShop, setVisibility, changeVisibility } = require('../controllers/shop.controller')
const ShopRouter = express.Router()

ShopRouter.put('/setVisibility', authJWT, setVisibility)
ShopRouter.get('/my-shop', authJWT, myShop)
ShopRouter.patch('/changeVisibility', changeVisibility)

module.exports = ShopRouter