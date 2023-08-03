const pool = require("../pool")

const checkEmail = (req, res, next)=>{
    let sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [req.body.email], (err, result)=>{
        if(err){            
            res.status(300).json({message: 'Internal Server Error'})
        }else {
            if (result.length == 0) {
                next()
            } else {
                res.status(200).json({status: false, message: 'Email already registered'})
            }
        }
    })   
}

module.exports = { checkEmail }