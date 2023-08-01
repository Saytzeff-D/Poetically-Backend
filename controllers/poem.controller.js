const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadPoem = (req, res)=>{
    console.log(req.user.user_id, req.body.title)
    const user = req.user
    const poem = req.body
    cloudinary.v2.uploader.upload(poem.bookFile, { folder: 'Poetically-Me' }, (err, bookFile)=>{
        if (!err) {
            poem.bookFile = bookFile.secure_url
            cloudinary.v2.uploader.upload(poem.coverImage, { folder: 'Poetically-Me' }, (err, coverImg)=>{
                if (!err) {
                    poem.coverImage = coverImg.secure_url
                    // Insert into the database
                } else {
                    res.status(500).json({message: 'Internal Server Error'})
                }
            })
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}

module.exports = { uploadPoem }