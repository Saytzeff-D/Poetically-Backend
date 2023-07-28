const { transporter, mailOption } = require("../mailer")
const pool = require("../pool")
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const login = (req, res)=>{
    let sql = `SELECT * FROM users WHERE (email = '${req.body.email}' AND password = '${req.body.password}')`
    pool.query(sql, (err, result)=>{
        if (err) {
            res.status(300).json({message: 'Internal Server Error'})
        } else {
            if (result.length == 0) {
                res.status(200).json({status: false, message: 'User not found'})
            } else {
                const token = jwt.sign({result: result[0]}, process.env.JWT, { expiresIn: '60m' })
                res.status(200).json({status: true, token})
            }
        }
    })
}
const validateEmail = (req, res)=>{
    let sql = `SELECT * FROM users WHERE (email = '${req.body.email}')`
    pool.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            res.status(300).json({message: 'Internal Server Error'})
        }else {
            if (result.length == 0) {
                res.status(200).json({status: true})
            } else {
                res.status(200).json({status: false, message: 'Email already registered'})
            }
        }
    })
}
const register = (req, res)=>{
    const email = req.body.email
    let referralCode = Math.random().toString(36).substr(2, 8)
    let verificationCode = Math.floor(Math.random()*1000000)
    let sql = `INSERT INTO 
                users (firstName, lastName, email, userName, country, state, bestDescribe, dob, password, referralCode, verificationCode) 
                VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.username}', '${req.body.country}', '${req.body.state}', 
                '${req.body.bestDescribe}', '${req.body.dob}', '${req.body.password}', '${referralCode}', '${verificationCode}')`
    pool.query(sql, (err, result)=>{
        if (err) {
            res.status(300).json({message: 'Internal Server Error', err})
        } else {
            transporter.sendMail(mailOption(verificationCode, email), (err, info)=>{
                if(err){
                    console.log(err)
                    res.status(200).json({status: true, message: 'Fail to send code'})
                }else{
                    res.status(200).json({status: true, message: 'Success', info})
                }
            })
        }
    })
}
const verifyEmail = (req, res)=>{
    const code = req.body.code
    const email = req.body.email
    const sql = `SELECT * FROM users WHERE email = '${email}'`
    pool.query(sql, (err, result)=>{
        if (err) {
            res.status.json({status: false, message: 'Internal Server Error'})
        } else {
            if (code == result[0].verificationCode) {
                const token = jwt.sign({result: result[0]}, process.env.JWT, { expiresIn: '60m' })
                res.status(200).json({status: true, token})
            } else {
                res.status(200).json({status: false, message: 'Invalid Code'})
            }
        }
    })
}
const currentUser = (req, res)=>{
    res.status(200).json({user: req.user})
}
const profilePicture = (req, res)=>{
    console.log(req.user.user_id)
    const picture = req.body.picture
    const user_id = req.user.user_id
    cloudinary.v2.uploader.upload(picture, { folder: 'Poetically-Me' }, (err, result)=>{
        if (!err) {
            const sql = `UPDATE users SET picture = '${result.secure_url}' WHERE user_id = '${user_id}'`
            pool.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                    res.status(300).json({status: false, message: 'Internal Server Error'})
                }else{
                    pool.query(`SELECT * FROM users WHERE user_id = '${user_id}'`, (err, user)=>{
                        res.status(200).json({status: true, message: 'Profile Picture Uploaded Successfully', user: user[0]})
                    })
                }
            })            
        } else {
            
        }
    })
}

module.exports = { login, register, verifyEmail, currentUser, validateEmail, profilePicture }