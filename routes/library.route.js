const express = require('express')
const { authJWT } = require('../middlewares/jwt.middleware')
const { myLibrary, addToLibrary } = require('../controllers/library.controller')
const { checkLibrary } = require('../middlewares/library.middleware')
const LibraryRouter = express.Router()

LibraryRouter.get('/myLibrary', authJWT, myLibrary)
LibraryRouter.post('/addLibrary', checkLibrary, addToLibrary)

module.exports = LibraryRouter