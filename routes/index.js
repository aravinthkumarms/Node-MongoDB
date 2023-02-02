const express = require('express');
const  { getBooks,getBookById,createBook, deleteBook ,patchBook} = require('./../controller/index.js');


const router = express.Router(); // create an instance of express


router.get('/books', getBooks);

router.get('/books/:id', getBookById);

router.post('/books',createBook)

router.delete('/books/:id',deleteBook)

router.patch('/books/:id',patchBook)


module.exports =router;