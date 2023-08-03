const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser');
const pool = require('./pool');
const userRouter = require('./routes/user.route');
const PoemRouter = require('./routes/poem.route');
const ReferralRouter = require('./routes/referral.route');
app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit:'50mb'}));
app.use('/user', userRouter)
app.use('/poem', PoemRouter)
app.use('/referral', ReferralRouter)

app.get('/', (req, res)=>{
    res.send('Poetically-Me Server is now live')
})

pool.getConnection((err, conn)=>{
    if (!err) {
        console.log('This server is now connected to a SQL Database')
    } else {
        console.log('Error in Connection')
    }
})
app.listen(process.env.PORT, (req, res)=>{
    console.log(`Poetically-Me Server is now listening on Port ${process.env.PORT}`)
})