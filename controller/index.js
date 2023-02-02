const { connectToDb, getDb } = require('../db/index');
const  {ObjectId} = require('mongodb');
let db;
connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})


module.exports.getBooks = (req, res) => {
    const page = req.query.p || 0;
    const booksPerPage = 3;
    let books = [];
    db.collection('books')
        .find()
        .sort({author:1})
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(()=>{
            res.status(200).json(books)
            console.log(`API getBooks - ${page} Invoked from`,req.headers['user-agent'])
        })
        .catch(()=>{
            res.status(400).json({error: 'Could not fetch records'})
        })
}

module.exports.getBookById = (req, res) => {

    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc=>{
            if(doc === null)res.status(404).json({error:"404 Not found"})
            else res.status(200).json(doc)
            console.log("API getBookById Invoked from",req.headers['user-agent'])
        })
        .catch(err =>{
            res.status(500).json({error:'Could not fetch document'})
        })
    }else{
        res.status(500).json({error:"Not a valid book id"})
    }
}

module.exports.createBook = (req,res) =>{
    const book = req.body
    db.collection('books')
        .insertOne(book)
        .then(result=>{
            res.status(201).json(result)
            console.log("API createBook Invoked from",req.headers['user-agent'])
        })
        .catch(err => {
            res.status(500).json({error:'Could not create a new document'})
        })
}

module.exports.deleteBook = (req,res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
            .deleteOne({_id:new ObjectId(req.params.id)})
            .then(result=>{
                res.status(200).json(result)
                console.log("API deleteBook Invoked from",req.headers['user-agent'])
            })
            .catch(err =>{
                res.status(500).json({error:'Could not delete Document'})
            })
    }
    else{
        res.status(500).json({error:"Not a valid book id"})
    }
}


module.exports.patchBook = (req,res) =>{
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
            .updateOne({_id:new ObjectId(req.params.id)},{$set : updates})
            .then(result=>{
                res.status(200).json(result)
                console.log("API patchBook Invoked from",req.headers['user-agent'])
            })
            .catch(err =>{
                res.status(304).json({error:'Could not modify Document'})
            })
    }
    else{
        res.status(500).json({error:"Not a valid book id"})
    }
}