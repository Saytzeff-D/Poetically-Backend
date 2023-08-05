const pool = require('../pool')

const sales = (req, res)=>{
    const payload = req.user
    let sql = `SELECT * FROM transactions JOIN poems USING(poem_id) WHERE seller_id = '${payload.user_id}'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({sales: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}
const purchases = (req, res)=>{
    const payload = req.user
    let sql = `SELECT * FROM transactions JOIN poems USING(poem_id) WHERE buyer_id = '${payload.user_id}'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({purchases: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}
const addTransaction = (req, res)=>{
    const payload = req.body
    const poem_id = payload.poem_id
    poem_id.map((each, ind)=>{        
        const values = [each, payload.trx_ref, payload.buyer_id, payload.seller_id[ind]]
        console.log(values)
        let sql = `INSERT INTO transactions (poem_id, trx_ref, buyer_id, seller_id) VALUES(?, ?, ?, ?)`
        pool.query(sql, values, (err, result)=>{
            if (err) {
                res.status(500).json({message: 'Internal Server Error', err})
            } else {
                if ((ind+1) == poem_id.length) {
                    res.status(200).json({message: 'Success'})
                } else {
                    
                }
            }
        })
    })
}

module.exports = { sales, purchases, addTransaction }