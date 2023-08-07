const express = require('express')
const { authJWT } = require('../middlewares/jwt.middleware')
const { myLibrary, addToLibrary } = require('../controllers/library.controller')
const LibraryRouter = express.Router()

LibraryRouter.get('/myLibrary', authJWT, myLibrary)
LibraryRouter.post('/addLibrary', addToLibrary)

module.exports = LibraryRouter