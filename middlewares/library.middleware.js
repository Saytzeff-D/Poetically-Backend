const pool = require("../pool")

const checkLibrary = (req, res, next)=>{
    const payload = req.body
    const sql = `SELECT * FROM library WHERE poem_id = '${payload.poem_id}' AND reader_id = '${payload.reader_id}'`
    pool.query(sql, (err,result)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            result.length == 0 ? next() : res.status(500).json({message: 'Poem already exist in your Library!'})
        }
    })
}

module.exports = { checkLibrary }