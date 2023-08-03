const express = require('express')
const { myReferrals } = require('../controllers/referral.controller')
const { authJWT } = require('../middlewares/jwt.middleware')
const ReferralRouter = express.Router()

ReferralRouter.get('/myReferrals', authJWT, myReferrals)

module.exports = ReferralRouter