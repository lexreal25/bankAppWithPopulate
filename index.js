const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const PORT = 4000

//import mongoose
const mongoose = require('mongoose')

const { listBookController, listAuthorController,createAuthorController, createBookController, updateBookController,deleteBookController, updateAuthorController} = require('./controllers')

const app = express('server')


const homePage = (req, res) => {
    const homepageFile = path.join(__dirname, 'public', 'index.html');
    res.sendFile(homepageFile)
}


//middlewares
app.use(bodyparser.json())

// routes

//search book
//app.get('/book/search', searchBookController)

//create book
app.post('/book', createBookController)

//creat author
app.post('/author', createAuthorController)

//view book
app.get('/book/:id?', listBookController)

//diplay authors
app.get('/author/:id?', listAuthorController)

//update book
app.put('/book', updateBookController)

//update author
app.put('/author', updateAuthorController)

//delete book
app.delete('/book', deleteBookController)

//get request from html
app.get('/', homePage)


mongoose.connect("mongodb+srv://user-123:user-123@lexorg.hkbta.mongodb.net/library?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( result => {
    app.listen(PORT, () => console.log('server ready on port:' + PORT))
})