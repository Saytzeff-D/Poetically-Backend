const express = require('express')
const { convertCurrency } = require('../controllers/currency.controller')
const CurrencyRouter = express.Router()

CurrencyRouter.post('/convert', convertCurrency)

module.exports = CurrencyRouter