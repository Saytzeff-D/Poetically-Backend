const pool = require("../pool");

const setVisibility = (req, res)=>{
    let payload = req.body
    const values = [payload.releaseDate, payload.baseCurrency, payload.price, payload.visibility, payload.poem_id]
    let sql = `UPDATE poems SET releaseDate = ?, baseCurrency = ?, price = ?, visibility = ? WHERE poem_id = ?`;
    pool.query(sql, values, (err, result)=>{
        if (!err) {
            res.status(200).json({status: true})
        } else {
            console.log(err)
            res.status(200).json({status: false})
        }
    })
}
const myShop = (req, res)=>{
    const payload = req.user
    let sql = `SELECT * FROM poems WHERE user_id = ? AND (visibility = 'Everybody' OR visibility = 'Users Only')`
    pool.query(sql, [payload.user_id], (err, result)=>{
        if (!err) {
            res.status(200).json({shop: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}
const changeVisibility = (req, res)=>{
    const payload = req.body
    const sql = `UPDATE poems SET visibility = '${payload.visibility}' WHERE poem_id = '${payload.poem_id}'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({message: 'Success'})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}

module.exports = { setVisibility, myShop, changeVisibility }