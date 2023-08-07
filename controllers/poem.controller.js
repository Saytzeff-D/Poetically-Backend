const cloudinary = require('cloudinary')
const pool = require('../pool')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadPoem = (req, res)=>{
    const user = req.user
    const poem = req.body
    cloudinary.v2.uploader.upload(poem.bookFile, { folder: 'Poetically-Me', use_filename: true,  resource_type: 'raw' }, (err, bookFile)=>{
        if (!err) {            
            poem.bookFile = bookFile.secure_url
            cloudinary.v2.uploader.upload(poem.coverImage, { folder: 'Poetically-Me'}, (err, coverImg)=>{
                if (!err) {                    
                    poem.coverImage = coverImg.secure_url
                    const values = [poem.title, poem.poet, poem.poem_desc, poem.category, poem.lang, poem.explicitContent, poem.publisherName, poem.ISBN, poem.publicationDate, poem.bookFile, poem.coverImage, user.user_id]
                    // Insert into the database
                    let sql = `
                        INSERT INTO 
                            poems (title, poet, poem_desc, category, lang, explicitContent, publisherName, ISBN, publicationDate, bookFile, coverImage, user_id) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `
                    pool.query(sql, values, (err, result)=>{
                        if (!err) {
                            res.status(200).json({status: true})
                        } else {
                           res.status(200).json({status: false, err})
                        }
                    })
                } else {
                    res.status(500).json({message: 'Internal Server Error', err})
                }
            })
        } else {
            res.status(500).json({message: 'Internal Server Error', err})
        }
    })
}
const myPoems = (req, res)=>{
    let sql = `SELECT * FROM poems WHERE user_id = '${req.user.user_id}'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({poems: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}
const topPoems = (req, res)=>{
    let sql = `SELECT * FROM poems WHERE visibility = 'Everybody' OR visibility = 'Users Only'`
    pool.query(sql, (err, result)=>{
        if (!err) {
            res.status(200).json({poems: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}

module.exports = { uploadPoem, myPoems, topPoems }