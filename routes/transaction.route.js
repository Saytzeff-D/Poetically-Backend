const express = require('express')
const { sales, purchases, addTransaction } = require('../controllers/transaction.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const TransactionRouter = express.Router()

TransactionRouter.get('/sales', authJWT, sales)
TransactionRouter.get('/purchases', authJWT, purchases)
TransactionRouter.post('/addTransaction', addTransaction)

module.exports = TransactionRouter