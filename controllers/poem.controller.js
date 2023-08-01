const cloudinary = require('cloudinary')
const pool = require('../pool')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadPoem = (req, res)=>{
    // console.log(req.user.user_id, req.body.title)
    const user = req.user
    const poem = req.body
    cloudinary.v2.uploader.upload(poem.bookFile, { folder: 'Poetically-Me', resource_type: 'auto' }, (err, bookFile)=>{
        if (!err) {            
            poem.bookFile = bookFile.secure_url
            cloudinary.v2.uploader.upload(poem.coverImage, { folder: 'Poetically-Me' }, (err, coverImg)=>{
                if (!err) {                    
                    poem.coverImage = coverImg.secure_url
                    // Insert into the database
                    let sql = `
                    INSERT INTO poems (title, poet, poem_desc, category, lang, explicitContent, publisherName, ISBN, publicationDate, bookFile, coverImage, user_id) VALUES ('${poem.title}', '${poem.poet}', '${poem.poem_desc}', '${poem.category}', '${poem.lang}', '${poem.explicitContent}', '${poem.publisherName}', '${poem.ISBN}', '${poem.publicationDate}', '${poem.bookFile}', '${poem.coverImage}', '${user.user_id}')
                    `
                    pool.query(sql, (err, result)=>{
                        if (!err) {
                            res.status(200).json({status: true})
                        } else {
                           res.status(200).json({status: false})
                        }
                    })
                } else {
                    res.status(500).json({message: 'Internal Server Error'})
                }
            })
        } else {
            res.status(500).json({message: 'Internal Server Error'})
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

module.exports = { uploadPoem, myPoems }