const pool = require("../pool")

const insertReferral = (req, res)=>{
    const payload = req.body
    let sql = `SELECT * FROM users WHERE referralCode = ?`
    pool.query(sql, [payload.referralCode], (err, result)=>{        
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            if (result.length !== 0) {
                let sql = `INSERT INTO referrals (email, user_id) VALUES(?, ?)`
                pool.query(sql, [result[0].email, result[0].user_id], (err, resp)=>{
                    if (err) {                        
                        res.status(500).json({message: 'Internal Server Error'})
                    }else res.status(200).json({status: true})                    
                })
            } else {
                console.log('Referral Code not found')
                res.status(200).json({status: true})
            }
        }
    })
}
const myReferrals = (req, res)=>{
    const payload = req.user
    let sql = `SELECT * FROM referrals WHERE user_id = ?`
    pool.query(sql, [payload.user_id], (err, result)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            res.status(200).json({referrals: result})
        }
    })
}

module.exports = { insertReferral, myReferrals }