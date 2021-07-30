    const BookModel = require('./modules')
    //account model
    const AuthorModel = require('./authorModel')
//controllers

const listBookController = (req, res) => {
    //get id
    const { id } = req.params
    //find specific book
    if(id){
        BookModel.find({author: id})
        .then( books => {
            res.json({message:'book found', data: books})
        })
        .catch(err => console.log(err))
    }
    else{
        BookModel.find().then((books) => {
            if (books.length === 0){
                res.json({message: 'database is empty'})
            }
            res.json({message: 'Books available', data: books})
        })
        .catch(err => console.log(err))
        }
}

//create books
const createBookController = (req, res) => {
    const { title, author, gist , publisher, YOP} = req.body
    //bookdModel instance
    const books = new BookModel({title, author, gist, publisher, YOP})
    books.save().then( result => {
        console.log(result)
        res.json({message:`${books.title} created successfuly`, data:result})
    })
    .catch(err => console.log(err))
}

//update book
const updateBookController = (req, res) => {
    const {id,title, author, gist , publisher, YOP} = req.body;
    BookModel.findById({_id: id}).then( book => {
        if(book){
            book.title = title,
            book.author = author,
            book.gist = gist,
            book.publisher = publisher,
            book.YOP = YOP

            book.save();
            res.json({message:'book updated', data:book})
            return book;
        }
        res.json({message:'update failed'})
    })
    .catch(err => console.log(err))
}

//delete book
const deleteBookController = (req, res) => {
    const { id } = req.body;
    //delete all records in the database
    // BookModel.deleteMany().then( deletedBooks => {
    //     if(deletedBooks){
    //         res.json({message: 'database cleared'})
    //         return;
    //     }
    //     res.json({message:'process invalid'})
    // })
    // .catch(err => console.log('delete failed'))
    //delete by specific ID
    BookModel.findByIdAndRemove(id).then( deletedBook => {
    if(deletedBook){
        res.json({message:'book deleted', data: deletedBook})
        return;
    }
    res.json({message: 'book not found'})
    })
    .catch(err => console.log(err))
}

//ACCOUNT CREATION CONTROLLERS
const listAuthorController = (req, res) => {
    AuthorModel.find()
        .populate('bookId')
        .then( author => {
            res.json({data: author})
        })
        .catch(err => console.log(err))
    // const { id } = req.body;
    // if (id){
    //     AuthorModel.find({name:id}).then( author =>{
    //         res.json({data: author})
    //     })
    //     .catch(err => console.log(err))
    // }
    // else{
    //     AuthorModel.find().then( author => {
    //         if(author.length === 0){
    //             res.json({message: 'database empty'})
    //         }
    //         res.json({data: author})
    //     })
    //     .catch(err => console.log(err))
    // }
}


//create author
const createAuthorController = (req, res) => {
    const { name,gender, age,country, dateCreated, authorId } = req.body;
    //create instance of the author model
    const author = new AuthorModel({name,gender, age,country, dateCreated, authorId });
    author.save().then( author => {
        res.json({message:'author created', data: author})
    })
    .catch(err => console.log(err))
}
//update author
const updateAuthorController = (req, res) => {
    const { id, name,gender, age,country} = req.body;
    AuthorModel.findById({_id: id}).then( author => {
        if(id){
            author.name = name,
            author.gender = gender,
            author.age = age,
            author.country = country,

            author.save();
            
            res.json({message: "author update successful", data: author})
        }
        res.json({message: "author update failed"})
    })
    .catch(err => console.log(err))
}


module.exports = {
    listBookController,
    listAuthorController,
    createAuthorController,
    createBookController,
    updateBookController,
    updateAuthorController,
    deleteBookController
}