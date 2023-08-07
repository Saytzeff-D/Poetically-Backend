const pool = require("../pool")

const myLibrary = (req, res)=>{
    const payload = req.user
    let sql = `SELECT * FROM library JOIN poems USING(poem_id) WHERE reader_id = '${payload.user_id}'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({library: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}
const addToLibrary = (req, res)=>{
    const payload = req.body
    let sql = `INSERT INTO library (poem_id, reader_id) VALUES('${payload.poem_id}', '${payload.user_id}')`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({message: 'Success'})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}

module.exports = { myLibrary, addToLibrary }